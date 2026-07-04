/**
 * Render-pair EXTRACTION from storefront templates (P1a residual #3) — TS mirror.
 *
 * The render-completeness backstop must know the set of `(foreground-token,
 * background-token)` pairs the storefront actually paints themed text for, to
 * assert every such pair is a gated `RENDER_PAIRINGS` row. Hand-enumerating that
 * set is the TAUTOLOGY the earlier test fell into. This module DERIVES the pair
 * set by parsing a template: it walks element nesting and resolves each themed
 * `text-*` token's effective single-token background (the token on the element
 * itself or its nearest concrete-surface ancestor), emitting the rendered pairs.
 *
 * The token classification + emit rules mirror
 * `backend/app/services/theme_render_pairs.py` byte-for-byte; the nesting walk
 * uses the browser `DOMParser` (the Python twin uses stdlib `html.parser`), so
 * the same template yields the same pairs on both sides.
 *
 * Only CONCRETE single-token surfaces establish context; the app-shell gradient
 * and image/overlay scrims are media (skipped); Angular components are opaque
 * (each wrapper's own template supplies its concrete pairs); server-emitted
 * colour-RAMP steps are recognised so a rendered ramp key yields an ungated pair
 * the backstop flags (residual #4).
 */

/** Themed FOREGROUND `text-<name>` class -> its CSS custom property. */
export const FG_TOKENS: Readonly<Record<string, string>> = {
  text: '--text',
  'text-secondary': '--text-secondary',
  'text-muted': '--text-muted',
  'text-strong': '--text-strong',
  'text-heading': '--text-heading',
  inverse: '--text-inverse',
  onmedia: '--text-onmedia',
  accent: '--accent',
  'accent-strong': '--accent-strong',
};

/** Themed BACKGROUND `bg-<name>` class -> its CSS custom property. */
export const BG_TOKENS: Readonly<Record<string, string>> = {
  background: '--background',
  'background-subtle': '--background-subtle',
  surface: '--surface',
  'surface-muted': '--surface-muted',
  'surface-raised': '--surface-raised',
  'surface-inverse': '--surface-inverse',
  'surface-inverse-hover': '--surface-inverse-hover',
  field: '--field',
  accent: '--accent',
  'accent-subtle': '--accent-subtle',
};

/** A server-emitted colour-ramp step (`surface-200` / `text-500` …). */
const RAMP = /^(?:background|surface|text|border)-(?:50|100|200|300|400|500|600|700|800|900|950)$/;

/** A Tailwind utility class: optional variants, a colour util, a name, opt `/opacity`. */
const CLASS = /((?:[a-z][a-z0-9-]*:)*)(bg|text|from|via|to)-([a-z0-9][a-z0-9-]*)(?:\/\d+)?/g;

/**
 * Tailwind PSEUDO-ELEMENT variants — they style a SEPARATE box (the file button,
 * ::before/::after, the placeholder, …), not the element's own text, so a
 * `file:bg-surface-inverse` must never read as the base fill for a sibling
 * `text-text` on the same element. Classes carrying one are skipped for pairing.
 */
const PSEUDO_ELEMENT_VARIANTS = new Set([
  'before',
  'after',
  'placeholder',
  'file',
  'marker',
  'selection',
  'first-line',
  'first-letter',
  'backdrop',
]);

/** True for an Angular class BINDING (`[ngClass]` / `[class]` / `[class.x]`). */
export function isDynamicClassAttr(name: string): boolean {
  return (
    name === '[ngclass]' ||
    name === '[class]' ||
    name.startsWith('[class.') ||
    name.startsWith('[attr.class')
  );
}

/** How a `bg-<name>` colour affects the background context. */
export interface BgClass {
  readonly kind: 'concrete' | 'inherit' | 'block';
  readonly token: string | null;
}

/** Classify a `bg-<name>` colour name into a context effect (mirror of `classify_bg`). */
export function classifyBg(name: string): BgClass {
  if (name === 'transparent') {
    return { kind: 'inherit', token: null };
  }
  if (name.startsWith('gradient') || name.startsWith('overlay')) {
    return { kind: 'block', token: null };
  }
  const token = BG_TOKENS[name];
  if (token) {
    return { kind: 'concrete', token };
  }
  if (RAMP.test(name)) {
    return { kind: 'concrete', token: `--${name}` };
  }
  return { kind: 'block', token: null };
}

/** Resolve a `text-<name>` colour name to its themed token, else `null`. */
export function classifyFg(name: string): string | null {
  const token = FG_TOKENS[name];
  if (token) {
    return token;
  }
  if (RAMP.test(name)) {
    return `--${name}`;
  }
  return null;
}

/** The themed tokens found on one element's attributes. */
export interface Scan {
  baseBg: string | null;
  baseBgBlock: boolean;
  hoverBg: string | null;
  readonly baseFg: string[];
  readonly hoverFg: string[];
}

/** Scan a STATIC `class` string for themed bg / text tokens (base + hover). */
export function scanClassBlob(blob: string): Scan {
  const scan: Scan = { baseBg: null, baseBgBlock: false, hoverBg: null, baseFg: [], hoverFg: [] };
  CLASS.lastIndex = 0;
  for (let match = CLASS.exec(blob); match !== null; match = CLASS.exec(blob)) {
    const [, variants, util, name] = match;
    if (variants.split(':').some((part) => part !== '' && PSEUDO_ELEMENT_VARIANTS.has(part))) {
      continue;
    }
    const isHover = variants.includes('hover:');
    if (util === 'from' || util === 'via' || util === 'to') {
      if (!isHover) {
        scan.baseBgBlock = true;
      }
      continue;
    }
    if (util === 'bg') {
      const { kind, token } = classifyBg(name);
      if (isHover) {
        if (kind === 'concrete') {
          scan.hoverBg = token;
        }
      } else if (kind === 'concrete') {
        scan.baseBg = token;
      } else if (kind === 'block') {
        scan.baseBgBlock = true;
      }
      continue;
    }
    const fg = classifyFg(name);
    if (fg !== null) {
      (isHover ? scan.hoverFg : scan.baseFg).push(fg);
    }
  }
  return scan;
}

/**
 * Scan an element from its STATIC `class` only. A dynamic class BINDING with no
 * static concrete background is treated as a possible unknown/gradient fill and
 * BLOCKS attribution (mirror of the Python `_scan_attrs`).
 */
export function scanElement(el: Element): Scan {
  let hasDynamic = false;
  for (const attr of Array.from(el.attributes)) {
    if (isDynamicClassAttr(attr.name.toLowerCase())) {
      hasDynamic = true;
    }
  }
  const scan = scanClassBlob(el.getAttribute('class') ?? '');
  if (hasDynamic && scan.baseBg === null) {
    scan.baseBgBlock = true;
  }
  return scan;
}

function resolveBg(scan: Scan, inherited: string | null): string | null {
  if (scan.baseBg !== null) {
    return scan.baseBg;
  }
  if (scan.baseBgBlock) {
    return null;
  }
  return inherited;
}

function emit(scan: Scan, effective: string | null, pairs: Set<string>): void {
  if (effective !== null) {
    for (const fg of scan.baseFg) {
      pairs.add(`${fg}|${effective}`);
    }
  }
  if (scan.hoverBg !== null) {
    for (const fg of scan.baseFg) {
      pairs.add(`${fg}|${scan.hoverBg}`);
    }
  }
  const hoverCtx = scan.hoverBg !== null ? scan.hoverBg : effective;
  if (hoverCtx !== null) {
    for (const fg of scan.hoverFg) {
      pairs.add(`${fg}|${hoverCtx}`);
    }
  }
}

function walk(el: Element, inherited: string | null, pairs: Set<string>): void {
  const scan = scanElement(el);
  const effective = resolveBg(scan, inherited);
  emit(scan, effective, pairs);
  for (const child of Array.from(el.children)) {
    walk(child, effective, pairs);
  }
}

/**
 * The set of rendered themed pairs, each encoded as `"<fg>|<bg>"`, that the
 * `template` paints (DOM-nesting resolved). Every top-level template node lands
 * under `<body>`, so each is walked from the null (page-shell) context.
 */
export function extractRenderPairs(template: string): Set<string> {
  const pairs = new Set<string>();
  const doc = new DOMParser().parseFromString(template, 'text/html');
  for (const child of Array.from(doc.body.children)) {
    walk(child, null, pairs);
  }
  return pairs;
}
