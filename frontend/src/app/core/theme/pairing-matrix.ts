/**
 * Curated global fg/bg contrast pairing matrix (P1a WU3).
 *
 * The pre-validated set of foreground/background colour pairings the storefront
 * defaults use, defined GLOBALLY across the home / listing / detail archetypes
 * (the token values are global, so a pairing's ratio is archetype-independent).
 * Every pairing is pre-validated >= WCAG AA using the WU8-core `contrast.ts`
 * maths, and each is tagged `size: 'body' | 'large'` (N-C4) so the AA threshold
 * (4.5:1 body / 3:1 large) is pinned per pairing rather than guessed — the exact
 * data WU8 enforces and WU10 exposes.
 *
 * Foreground/background reference the seed colour tokens by name
 * (`token-taxonomy.ts`); the ratios are computed from those tokens' compiled
 * defaults. A candidate that fails its honest AA target (e.g. muted text on the
 * raised surface, ~4.35:1 < 4.5) is deliberately EXCLUDED — the matrix is the
 * known-good set, not every possible combination.
 */

import { AA_THRESHOLDS, contrastRatio, passesAa, type RgbTriplet, type TextSize } from './contrast';
import { type Archetype, ARCHETYPES, stateColorDefault } from './token-taxonomy';

/** A curated, pre-validated foreground-on-background pairing. */
export interface Pairing {
  /** Stable identifier. */
  readonly id: string;
  /** Foreground (text) colour token name. */
  readonly foreground: string;
  /** Background colour token name. */
  readonly background: string;
  /** Text size selecting the AA threshold. */
  readonly size: TextSize;
  /** Archetypes this pairing applies to (all three — the tokens are global). */
  readonly archetypes: readonly Archetype[];
  /** The pinned AA target ratio (== `AA_THRESHOLDS[size]`). */
  readonly minRatio: number;
  /** Human-readable role of the pairing. */
  readonly role: string;
}

function pairing(
  id: string,
  foreground: string,
  background: string,
  size: TextSize,
  role: string,
): Pairing {
  return {
    id,
    foreground,
    background,
    size,
    archetypes: ARCHETYPES,
    minRatio: AA_THRESHOLDS[size],
    role,
  };
}

/**
 * The curated pairing matrix. It gates EVERY admin-editable background surface WU5
 * shipped (`--background` / `--surface` / `--surface-muted` / `--surface-inverse` /
 * `--field` / `--accent-subtle`) against every foreground token that co-renders on it
 * in the storefront — INCLUDING the FIXED (non-admin-editable) foregrounds
 * `--text-inverse` (on the dark inverse chips / CTAs / cart badge) and `--text-heading`
 * (in the field inputs), whose surface an admin CAN recolour. Without these an admin
 * could set an editable surface (e.g. `--surface-inverse` white) through the shipped
 * control and publish an illegible ~1:1 render past the 'authoritative' gate.
 * `--surface-raised` is intentionally absent: it paints only skeleton / divider bars
 * (no text). Each pairing is global across the archetypes and pre-validated at its
 * tagged size — the small UI chips / labels / inputs render at `body`, so their
 * pairings are `body` even for heading-role foregrounds; the hero
 * `heading-on-{background,surface}` (`large`) pairings model the display type.
 * Kept in EXACT parity with `theme_contrast.py` PAIRINGS (same ids, same sizes).
 */
export const PAIRINGS: readonly Pairing[] = [
  // text-on-background
  pairing('text-on-background', '--text', '--background', 'body', 'body copy on the page canvas'),
  pairing(
    'heading-on-background',
    '--text-heading',
    '--background',
    'large',
    'hero / display headings on the page canvas',
  ),
  pairing(
    'heading-sm-on-background',
    '--text-heading',
    '--background',
    'body',
    'body-size heading text (buttons / option labels) on the page canvas',
  ),
  pairing(
    'strong-on-background',
    '--text-strong',
    '--background',
    'body',
    'emphasised chip / badge labels on the page canvas',
  ),
  pairing(
    'secondary-on-background',
    '--text-secondary',
    '--background',
    'body',
    'secondary descriptions on the page canvas',
  ),
  pairing(
    'muted-on-background',
    '--text-muted',
    '--background',
    'body',
    'captions / meta on the page canvas',
  ),
  // text-on-surface
  pairing('text-on-surface', '--text', '--surface', 'body', 'body copy on raised surfaces'),
  pairing(
    'heading-on-surface',
    '--text-heading',
    '--surface',
    'large',
    'hero / display headings on raised surfaces',
  ),
  pairing(
    'heading-sm-on-surface',
    '--text-heading',
    '--surface',
    'body',
    'body-size heading text (menu hover / icon buttons) on raised surfaces',
  ),
  pairing(
    'strong-on-surface',
    '--text-strong',
    '--surface',
    'body',
    'emphasised icon-button labels on raised surfaces',
  ),
  pairing(
    'secondary-on-surface',
    '--text-secondary',
    '--surface',
    'body',
    'secondary chip labels on raised surfaces',
  ),
  // text-on-surface-muted (the sunken / hover fill)
  pairing(
    'text-on-surface-muted',
    '--text',
    '--surface-muted',
    'body',
    'body copy / labels on the sunken / hover fill',
  ),
  pairing(
    'strong-on-surface-muted',
    '--text-strong',
    '--surface-muted',
    'body',
    'emphasised pill labels on the hover fill',
  ),
  pairing(
    'heading-on-surface-muted',
    '--text-heading',
    '--surface-muted',
    'body',
    'heading text on the hover fill (menu hover / active buttons)',
  ),
  // fixed-foreground pairings on editable surfaces (the WU5 gap this rework closes)
  pairing(
    'inverse-on-surface-inverse',
    '--text-inverse',
    '--surface-inverse',
    'body',
    'FIXED white glyphs on the inverse chips / CTAs / cart badge',
  ),
  pairing(
    'heading-on-field',
    '--text-heading',
    '--field',
    'body',
    'FIXED input text glyphs on the text-field fill',
  ),
  // text-on-accent (accent as the link/text foreground on neutral backgrounds)
  pairing(
    'accent-on-background',
    '--accent',
    '--background',
    'body',
    'link text on the page canvas',
  ),
  pairing('accent-on-surface', '--accent', '--surface', 'body', 'link text on raised surfaces'),
  pairing(
    'accent-strong-on-accent-subtle',
    '--accent-strong',
    '--accent-subtle',
    'body',
    'category-chip labels on the accent-tinted surface',
  ),
];

/** Parse a frozen `R G B` triplet string into an sRGB tuple for contrast maths. */
export function parseTriplet(value: string): RgbTriplet {
  const parts = value.split(' ').map(Number);
  if (parts.length !== 3) {
    throw new Error(`expected an "R G B" triplet, got: ${value}`);
  }
  return [parts[0], parts[1], parts[2]];
}

/**
 * Resolve a pairing endpoint token name to its LIGHT compiled-default sRGB colour.
 *
 * Endpoints span the FULL storefront colour vocabulary (`STATE_TOKENS`), not just the
 * admin-facing seed set — the WU5 role/state shades a pairing gates (`--surface-muted`,
 * `--surface-inverse`, `--field`, `--text-inverse`, `--accent-subtle`, …) live there.
 * A non-colour token name (or an unknown one) has no light default and throws.
 */
export function colorFor(name: string): RgbTriplet {
  const light = stateColorDefault(name);
  if (light === undefined) {
    throw new Error(`not a known colour token: ${name}`);
  }
  return parseTriplet(light);
}

/** The computed WCAG contrast ratio of a pairing (from compiled defaults). */
export function pairingRatio(pair: Pairing): number {
  return contrastRatio(colorFor(pair.foreground), colorFor(pair.background));
}

/** Whether a pairing meets its tagged AA threshold. */
export function pairingPassesAa(pair: Pairing): boolean {
  return passesAa(colorFor(pair.foreground), colorFor(pair.background), pair.size);
}
