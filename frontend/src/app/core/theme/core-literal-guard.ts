/**
 * Core-palette literal guard (P1a WU5).
 *
 * Machine-checks the "verifiable themeable-core" contract from both sides:
 *
 *  - regression / diff mode: flags any NEW hardcoded core-palette literal that a
 *    storefront core surface should be consuming through a token instead.
 *  - absolute / exhaustiveness mode: run once over the current tree, EVERY core literal
 *    must be either tokenized (so it does not appear) or on the reviewed allowlist — so
 *    WU0's hand enumeration is machine-checked, not trusted (closes the vacuous-pass hole).
 *
 * A "core literal" is a bare (non-`dark:`) storefront core-palette Tailwind utility class
 * (`bg`/`text`/`border`/`ring`/`from`/`via`/`to`/`divide`/`accent`/… on
 * `white`/`black`/`slate-*`/`indigo-*`) or a raw hex color. `dark:` variants are baked in
 * P1a (dark palette deferred) and are intentionally NOT flagged. State/decorative families
 * (amber/rose/emerald/…) are out of the core vocabulary and are never flagged.
 *
 * Pure and dependency-free; the `scripts/check-core-literals.mjs` CI runner mirrors this
 * logic over the real file tree.
 */

/** The kind of core-palette literal that was found. */
export type CoreLiteralKind = 'tw-class' | 'hex';

/** A single flagged core-palette literal, with its 1-based source position. */
export interface CoreLiteralFinding {
  readonly line: number;
  readonly column: number;
  readonly text: string;
  readonly kind: CoreLiteralKind;
}

// Core storefront utility prefixes that carry a palette colour.
const CORE_UTIL = 'bg|text|border|ring|from|via|to|divide|accent|placeholder|fill|stroke';
// Core colour vocabulary: white / black / slate-<shade> / indigo-<shade>.
const CORE_COLOR = 'white|black|slate-\\d{2,3}|indigo-\\d{2,3}';

const TW_CLASS = new RegExp(
  `(?<![\\w:-])((?:[a-z-]+:)*)(?:${CORE_UTIL})-(?:${CORE_COLOR})(?![\\w-])`,
  'g',
);
const HEX = /#[0-9a-fA-F]{3,8}\b/g;

function positionAt(source: string, index: number): { line: number; column: number } {
  let line = 1;
  let lineStart = 0;
  for (let i = 0; i < index; i += 1) {
    if (source.charCodeAt(i) === 10 /* \n */) {
      line += 1;
      lineStart = i + 1;
    }
  }
  return { line, column: index - lineStart + 1 };
}

/**
 * Scan `source` for every core-palette literal. `dark:`-prefixed utility classes are
 * skipped (baked dark palette); everything else that hits the core vocabulary is returned.
 */
export function scanCoreLiterals(source: string): CoreLiteralFinding[] {
  const findings: CoreLiteralFinding[] = [];

  TW_CLASS.lastIndex = 0;
  for (let m = TW_CLASS.exec(source); m !== null; m = TW_CLASS.exec(source)) {
    const variants = m[1];
    if (variants.includes('dark:')) {
      continue;
    }
    const { line, column } = positionAt(source, m.index);
    findings.push({ line, column, text: m[0], kind: 'tw-class' });
  }

  HEX.lastIndex = 0;
  for (let m = HEX.exec(source); m !== null; m = HEX.exec(source)) {
    const { line, column } = positionAt(source, m.index);
    findings.push({ line, column, text: m[0], kind: 'hex' });
  }

  return findings;
}

/**
 * Absolute-mode sweep: every core literal in `source` that is NOT on `allowlist`
 * (a set of reviewed, documented non-core / baked exceptions) is a violation.
 */
export function findUnmappedCoreLiterals(
  source: string,
  allowlist: readonly string[],
): CoreLiteralFinding[] {
  const allowed = new Set(allowlist);
  return scanCoreLiterals(source).filter((finding) => !allowed.has(finding.text));
}
