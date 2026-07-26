/**
 * P2 capture sweep — "capture once, analyse many".
 *
 * Drives every route in routes.json across the viewport x theme matrix and writes
 * a self-contained evidence bundle per cell. Hundreds of analysis agents then read
 * those artifacts read-only, instead of each launching its own browser (this box
 * has ~1.5 GB free RAM; concurrent Chromium fleets freeze it — that failure mode is
 * already on the ledger).
 *
 * Per cell it records: screenshot, rendered HTML, console + page errors, failed
 * network requests, axe-core violations, layout/tap-target/contrast-adjacent DOM
 * metrics, and navigation timings.
 *
 * Deps resolve from the ui-audit skill (which vendors playwright + @axe-core/playwright)
 * via createRequire, so this file can live in the repo while reusing that toolchain.
 *
 * Usage:
 *   node capture_sweep.mjs --base http://localhost:4202 --out <dir> [--concurrency 2]
 *                          [--only storefront|admin] [--limit N] [--resume]
 *
 * Terminal state: prints SUCCESS:<id> or FAILED:<id> <reason> as the last line.
 */

import { createRequire } from 'node:module';
import { mkdirSync, writeFileSync, existsSync, readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import os from 'node:os';

const HERE = dirname(fileURLToPath(import.meta.url));
const UA_SKILL = join(os.homedir(), '.claude', 'skills', 'ui-audit', 'package.json');
const req = createRequire(UA_SKILL);
const { chromium } = req('playwright');

let AxeBuilder = null;
try {
  const mod = req('@axe-core/playwright');
  AxeBuilder = mod.default ?? mod.AxeBuilder ?? mod;
} catch {
  AxeBuilder = null; // reported explicitly per cell — never silently "clean"
}

// ---------------------------------------------------------------- args
const argv = process.argv.slice(2);
const arg = (name, dflt = null) => {
  const i = argv.indexOf(`--${name}`);
  return i >= 0 ? argv[i + 1] : dflt;
};
const flag = (name) => argv.includes(`--${name}`);

const BASE = (arg('base', 'http://localhost:4202') || '').replace(/\/$/, '');
const OUT = arg('out', join(HERE, '..', '_artifacts'));
const CONCURRENCY = Math.max(1, parseInt(arg('concurrency', '2'), 10) || 2);
const ONLY = arg('only');
const LIMIT = parseInt(arg('limit', '0'), 10) || 0;
const RESUME = flag('resume');

const OWNER_USER = process.env.P2_OWNER_USER || 'owner';
const OWNER_PASS = process.env.P2_OWNER_PASS || '';

const VIEWPORTS = [
  { id: 'mobile', width: 375, height: 812 },
  { id: 'tablet', width: 768, height: 1024 },
  { id: 'desktop', width: 1440, height: 900 },
];
const THEMES = ['light', 'dark'];

// ---------------------------------------------------------------- helpers
const slug = (s) => s.replace(/[^a-z0-9]+/gi, '_').replace(/^_+|_+$/g, '') || 'root';

/** In-page metrics: the deterministic signals analysis agents reason over. */
const COLLECT = () => {
  const vis = (el) => {
    const r = el.getBoundingClientRect();
    const st = getComputedStyle(el);
    return r.width > 0 && r.height > 0 && st.visibility !== 'hidden' && st.display !== 'none';
  };
  const interactive = Array.from(
    document.querySelectorAll('button,a[href],input,select,textarea,[role="button"],[tabindex]'),
  ).filter(vis);

  const smallTargets = interactive
    .map((el) => {
      const r = el.getBoundingClientRect();
      return { tag: el.tagName.toLowerCase(), w: Math.round(r.width), h: Math.round(r.height),
               text: (el.textContent || '').trim().slice(0, 40),
               sel: el.id ? `#${el.id}` : el.className && typeof el.className === 'string'
                    ? `.${el.className.split(/\s+/).filter(Boolean).slice(0, 2).join('.')}` : el.tagName.toLowerCase() };
    })
    .filter((t) => (t.w < 24 || t.h < 24) && t.w > 0 && t.h > 0);

  const imgsNoAlt = Array.from(document.images)
    .filter((i) => !i.hasAttribute('alt'))
    .map((i) => (i.currentSrc || i.src || '').slice(-70));
  const imgsNoDims = Array.from(document.images)
    .filter((i) => !i.getAttribute('width') || !i.getAttribute('height'))
    .length;

  // Horizontal overflow: the classic i18n/long-string breakage.
  const de = document.documentElement;
  const overflowX = de.scrollWidth - de.clientWidth;
  const overflowing = Array.from(document.querySelectorAll('*'))
    .filter((el) => vis(el) && el.getBoundingClientRect().right > de.clientWidth + 2)
    .slice(0, 12)
    .map((el) => ({ tag: el.tagName.toLowerCase(),
                    sel: el.id ? `#${el.id}` : (typeof el.className === 'string' ? el.className.split(/\s+/)[0] : ''),
                    right: Math.round(el.getBoundingClientRect().right),
                    text: (el.textContent || '').trim().slice(0, 40) }));

  const headings = Array.from(document.querySelectorAll('h1,h2,h3,h4,h5,h6'))
    .map((h) => ({ level: Number(h.tagName[1]), text: (h.textContent || '').trim().slice(0, 70) }));

  const nav = performance.getEntriesByType('navigation')[0] || {};
  const paints = Object.fromEntries(
    performance.getEntriesByType('paint').map((p) => [p.name, Math.round(p.startTime)]),
  );

  return {
    title: document.title,
    lang: document.documentElement.lang || null,
    textLen: (document.body.innerText || '').trim().length,
    counts: {
      interactive: interactive.length,
      images: document.images.length,
      forms: document.forms.length,
      h1: document.querySelectorAll('h1').length,
    },
    headings: headings.slice(0, 25),
    a11yQuick: {
      imagesMissingAlt: imgsNoAlt.length,
      imagesMissingAltSamples: imgsNoAlt.slice(0, 6),
      imagesMissingDimensions: imgsNoDims,
      smallTapTargets: smallTargets.length,
      smallTapTargetSamples: smallTargets.slice(0, 8),
      emptyLinks: Array.from(document.querySelectorAll('a[href]'))
        .filter((a) => !(a.textContent || '').trim() && !a.getAttribute('aria-label') && !a.querySelector('img[alt]:not([alt=""])'))
        .length,
      buttonsNoAccessibleName: Array.from(document.querySelectorAll('button'))
        .filter((b) => !(b.textContent || '').trim() && !b.getAttribute('aria-label') && !b.getAttribute('title'))
        .length,
    },
    layout: { scrollWidth: de.scrollWidth, clientWidth: de.clientWidth, overflowX, overflowing },
    seo: {
      metaDescription: document.querySelector('meta[name="description"]')?.content?.slice(0, 160) || null,
      canonical: document.querySelector('link[rel="canonical"]')?.href || null,
      ogTitle: document.querySelector('meta[property="og:title"]')?.content || null,
      jsonLd: document.querySelectorAll('script[type="application/ld+json"]').length,
      robots: document.querySelector('meta[name="robots"]')?.content || null,
    },
    perf: {
      domContentLoaded: Math.round(nav.domContentLoadedEventEnd || 0),
      loadEvent: Math.round(nav.loadEventEnd || 0),
      transferSize: nav.transferSize || 0,
      ...paints,
    },
    themeTokens: {
      background: getComputedStyle(de).getPropertyValue('--background').trim() || null,
      text: getComputedStyle(de).getPropertyValue('--text').trim() || null,
      hasMsTheme: !!document.getElementById('ms-theme'),
    },
  };
};

async function captureCell(ctx, route, vp, theme, outDir) {
  const page = await ctx.newPage();
  const consoleErrors = [];
  const pageErrors = [];
  const failedRequests = [];
  page.on('console', (m) => { if (m.type() === 'error') consoleErrors.push(m.text().slice(0, 200)); });
  page.on('pageerror', (e) => pageErrors.push(String(e.message).slice(0, 200)));
  page.on('requestfailed', (r) => failedRequests.push({ url: r.url().slice(0, 160), err: r.failure()?.errorText || '' }));
  page.on('response', (r) => { if (r.status() >= 400) failedRequests.push({ url: r.url().slice(0, 160), status: r.status() }); });

  const rec = { route: route.url, surface: route.surface, auth: route.auth, viewport: vp.id, theme,
                base: BASE, ok: false };
  const t0 = Date.now();
  try {
    const resp = await page.goto(BASE + route.url, { waitUntil: 'domcontentloaded', timeout: 45000 });
    rec.httpStatus = resp ? resp.status() : null;
    await page.waitForLoadState('networkidle', { timeout: 12000 }).catch(() => { rec.networkIdle = false; });
    if (rec.networkIdle !== false) rec.networkIdle = true;
    await page.waitForTimeout(400);

    rec.metrics = await page.evaluate(COLLECT);
    rec.finalUrl = page.url().replace(BASE, '');
    rec.redirected = rec.finalUrl !== route.url;

    if (AxeBuilder) {
      try {
        const results = await new AxeBuilder({ page })
          .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
          .analyze();
        rec.axe = {
          available: true,
          violationCount: results.violations.length,
          violations: results.violations.map((v) => ({
            id: v.id, impact: v.impact, help: v.help,
            nodes: v.nodes.slice(0, 4).map((n) => ({ target: n.target, html: (n.html || '').slice(0, 160) })),
            nodeCount: v.nodes.length,
          })),
        };
      } catch (e) {
        rec.axe = { available: true, error: String(e.message).slice(0, 160) };
      }
    } else {
      rec.axe = { available: false, note: 'axe not installed — a11y NOT scanned for this cell' };
    }

    const stem = `${slug(route.url)}__${vp.id}__${theme}`;
    await page.screenshot({ path: join(outDir, `${stem}.png`), fullPage: true }).catch(() => {});
    writeFileSync(join(outDir, `${stem}.html`), await page.content(), 'utf8');
    rec.screenshot = `${stem}.png`;
    rec.html = `${stem}.html`;
    rec.ok = true;
  } catch (e) {
    rec.error = String(e.message).slice(0, 300);
  }
  rec.consoleErrors = consoleErrors.slice(0, 15);
  rec.pageErrors = pageErrors.slice(0, 15);
  rec.failedRequests = failedRequests.slice(0, 20);
  rec.elapsedMs = Date.now() - t0;
  await page.close().catch(() => {});
  return rec;
}

async function main() {
  const routesFile = join(HERE, '..', 'routes.json');
  const { routes } = JSON.parse(readFileSync(routesFile, 'utf8'));
  let work = routes.filter((r) => (ONLY ? r.surface === ONLY : true));
  if (LIMIT) work = work.slice(0, LIMIT);

  mkdirSync(OUT, { recursive: true });
  const cellsDir = join(OUT, 'cells');
  mkdirSync(cellsDir, { recursive: true });

  const browser = await chromium.launch({ headless: true, args: ['--no-sandbox', '--disable-dev-shm-usage'] });

  // Authenticate once; reuse the storage state for every gated route. Logging in
  // through the UI keeps this agnostic to token-vs-cookie storage.
  let storageState;
  const needsAuth = work.some((r) => r.auth !== 'anon');
  if (needsAuth && OWNER_PASS) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const pg = await ctx.newPage();
    try {
      const res = await pg.request.post(`${BASE}/api/v1/auth/login`, {
        data: { identifier: OWNER_USER, password: OWNER_PASS },
      });
      const body = await res.json().catch(() => ({}));
      await pg.goto(BASE + '/', { waitUntil: 'domcontentloaded', timeout: 45000 });
      // Real shape (verified): { user: {...}, tokens: { access_token, refresh_token, token_type } }
      // plus a refresh_token cookie. Seed every plausible storage key AND keep the
      // cookie, so the app bootstraps a session whichever mechanism it reads.
      const token =
        body?.tokens?.access_token || body?.access_token || body?.token || body?.data?.access_token;
      const refresh = body?.tokens?.refresh_token || body?.refresh_token;
      if (token) {
        await pg.evaluate(
          ({ t, r }) => {
            for (const k of ['access_token', 'token', 'auth_token', 'ms_access_token']) {
              localStorage.setItem(k, t);
            }
            if (r) localStorage.setItem('refresh_token', r);
            localStorage.setItem('auth', JSON.stringify({ access_token: t, refresh_token: r }));
          },
          { t: token, r: refresh },
        );
      }
      storageState = await ctx.storageState();
      console.log(`[auth] login status=${res.status()} tokenCaptured=${!!token}`);
    } catch (e) {
      console.log(`[auth] FAILED: ${String(e.message).slice(0, 140)} — gated routes will capture logged-out`);
    }
    await ctx.close();
  } else if (needsAuth) {
    console.log('[auth] no P2_OWNER_PASS provided — gated routes will capture logged-out');
  }

  const cells = [];
  for (const r of work) for (const vp of VIEWPORTS) for (const theme of THEMES) cells.push({ r, vp, theme });
  console.log(`[sweep] ${work.length} routes x ${VIEWPORTS.length} viewports x ${THEMES.length} themes = ${cells.length} cells (concurrency ${CONCURRENCY})`);

  let done = 0, failed = 0, skipped = 0;
  const index = [];
  let cursor = 0;

  async function worker(id) {
    const ctx = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      colorScheme: 'light',
      storageState,
      ignoreHTTPSErrors: true,
    });
    while (cursor < cells.length) {
      const cell = cells[cursor++];
      const stem = `${slug(cell.r.url)}__${cell.vp.id}__${cell.theme}`;
      const outJson = join(cellsDir, `${stem}.json`);
      if (RESUME && existsSync(outJson)) { skipped++; index.push({ stem, resumed: true }); continue; }

      const cellCtx = await browser.newContext({
        viewport: { width: cell.vp.width, height: cell.vp.height },
        colorScheme: cell.theme,
        storageState: cell.r.auth === 'anon' ? undefined : storageState,
        ignoreHTTPSErrors: true,
      });
      let rec;
      try {
        rec = await captureCell(cellCtx, cell.r, cell.vp, cell.theme, cellsDir);
      } catch (e) {
        rec = { route: cell.r.url, viewport: cell.vp.id, theme: cell.theme, ok: false, error: String(e.message).slice(0, 200) };
      }
      await cellCtx.close().catch(() => {});
      writeFileSync(outJson, JSON.stringify(rec, null, 2), 'utf8');
      index.push({ stem, route: rec.route, viewport: rec.viewport, theme: rec.theme, ok: rec.ok,
                   axeViolations: rec.axe?.violationCount ?? null,
                   consoleErrors: (rec.consoleErrors || []).length,
                   overflowX: rec.metrics?.layout?.overflowX ?? null });
      rec.ok ? done++ : failed++;
      if ((done + failed) % 20 === 0) console.log(`[sweep] ${done + failed}/${cells.length} (ok=${done} failed=${failed})`);
    }
    await ctx.close().catch(() => {});
  }

  await Promise.all(Array.from({ length: CONCURRENCY }, (_, i) => worker(i)));
  await browser.close();

  writeFileSync(join(OUT, 'index.json'),
    JSON.stringify({ base: BASE, generatedFrom: 'capture_sweep.mjs', totals: { cells: cells.length, ok: done, failed, skipped }, cells: index }, null, 2), 'utf8');

  console.log(`[sweep] ok=${done} failed=${failed} skipped=${skipped} -> ${OUT}`);
  console.log(failed > cells.length * 0.25 ? `FAILED:p2-capture-sweep too many cell failures (${failed}/${cells.length})`
                                           : `SUCCESS:p2-capture-sweep ok=${done} failed=${failed} skipped=${skipped}`);
}

main().catch((e) => { console.error(`FAILED:p2-capture-sweep ${String(e.stack || e.message).slice(0, 400)}`); process.exit(1); });
