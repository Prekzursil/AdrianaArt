import { AA_THRESHOLDS } from './contrast';
import {
  colorFor,
  PAIRINGS,
  pairingPassesAa,
  pairingRatio,
  parseTriplet,
  type Pairing,
} from './pairing-matrix';
import { ARCHETYPES, stateColorDefault } from './token-taxonomy';

describe('PAIRINGS', () => {
  it('is non-empty with unique ids', () => {
    expect(PAIRINGS.length).toBeGreaterThan(0);
    const ids = PAIRINGS.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('references only known colour tokens for both endpoints', () => {
    for (const pair of PAIRINGS) {
      for (const name of [pair.foreground, pair.background]) {
        // Endpoints span the full storefront colour vocabulary (STATE_TOKENS),
        // not just the admin-facing seed set — every one must resolve to a light
        // compiled default (i.e. be a known colour token).
        expect(stateColorDefault(name))
          .withContext(`${name} must be a known colour token`)
          .toBeDefined();
        expect(() => colorFor(name))
          .withContext(`${name} must resolve to an sRGB triplet`)
          .not.toThrow();
      }
    }
  });

  it('pins each minRatio to the AA threshold for its tagged size', () => {
    for (const pair of PAIRINGS) {
      expect(pair.minRatio).toBe(AA_THRESHOLDS[pair.size]);
    }
  });

  it('every pairing meets its tagged AA target (pre-validated)', () => {
    for (const pair of PAIRINGS) {
      expect(pairingPassesAa(pair))
        .withContext(`${pair.id} must pass AA at size ${pair.size}`)
        .toBe(true);
    }
  });

  it('every computed ratio is at or above its pinned minimum', () => {
    for (const pair of PAIRINGS) {
      expect(pairingRatio(pair))
        .withContext(`${pair.id} ratio must clear ${pair.minRatio}`)
        .toBeGreaterThanOrEqual(pair.minRatio);
    }
  });

  it('applies globally to all three archetypes', () => {
    for (const pair of PAIRINGS) {
      expect(pair.archetypes).toEqual(ARCHETYPES);
    }
  });

  it('covers the text-on-background / -surface / -accent categories', () => {
    const backgrounds = new Set(PAIRINGS.map((p) => p.background));
    const foregrounds = new Set(PAIRINGS.map((p) => p.foreground));
    expect(backgrounds.has('--background')).toBe(true);
    expect(backgrounds.has('--surface')).toBe(true);
    expect(foregrounds.has('--accent')).toBe(true);
  });

  it('gates EVERY admin-editable background surface that renders text (WU5 gap)', () => {
    // No editable background surface may lack a text-contrast pairing, or an admin
    // could set it to a contrast-failing value through the shipped control and ship
    // an illegible render past the gate. `--surface-raised` is intentionally absent
    // (skeleton / divider bars only — no text).
    const backgrounds = new Set(PAIRINGS.map((p) => p.background));
    for (const surface of [
      '--background',
      '--surface',
      '--surface-muted',
      '--surface-inverse',
      '--field',
      '--accent-subtle',
    ]) {
      expect(backgrounds.has(surface)).withContext(`${surface} must be gated`).toBe(true);
    }
    expect(backgrounds.has('--surface-raised')).toBe(false);
  });

  it('gates the FIXED (non-admin-editable) foregrounds on editable surfaces', () => {
    // The exact pairings the WU5 gap left open: a fixed white/dark glyph on an
    // editable surface. Each is tagged `body` (the size the small UI text renders).
    const byId = new Map(PAIRINGS.map((p) => [p.id, p] as const));
    for (const [id, fg, bg] of [
      ['inverse-on-surface-inverse', '--text-inverse', '--surface-inverse'],
      ['heading-on-field', '--text-heading', '--field'],
      ['text-on-surface-muted', '--text', '--surface-muted'],
      ['accent-strong-on-accent-subtle', '--accent-strong', '--accent-subtle'],
    ] as const) {
      const pair = byId.get(id);
      expect(pair).withContext(`${id} must exist`).toBeTruthy();
      expect(pair?.foreground).toBe(fg);
      expect(pair?.background).toBe(bg);
      expect(pair?.size).toBe('body');
    }
  });

  it('tags both body and large sizes across the matrix', () => {
    const sizes = new Set(PAIRINGS.map((p) => p.size));
    expect(sizes.has('body')).toBe(true);
    expect(sizes.has('large')).toBe(true);
  });
});

describe('parseTriplet', () => {
  it('parses a valid "R G B" triplet into a numeric tuple', () => {
    expect(parseTriplet('79 70 229')).toEqual([79, 70, 229]);
  });

  it('throws on a string without exactly three channels', () => {
    expect(() => parseTriplet('15 23')).toThrowError(/R G B/);
  });
});

describe('colorFor', () => {
  it('resolves a colour token name to its compiled-default sRGB tuple', () => {
    expect(colorFor('--background')).toEqual([255, 255, 255]);
  });

  it('throws for an unknown token name', () => {
    expect(() => colorFor('--nope')).toThrowError(/known colour token/);
  });

  it('throws for a non-colour token (e.g. a font token)', () => {
    expect(() => colorFor('--font-body')).toThrowError(/known colour token/);
  });
});

describe('pairingPassesAa (fail path)', () => {
  it('reports false for a deliberately low-contrast pairing', () => {
    // muted text on the raised surface is ~4.35:1 — below the 4.5 body target,
    // which is exactly why it is EXCLUDED from the curated matrix.
    const bad: Pairing = {
      id: 'muted-on-surface',
      foreground: '--text-muted',
      background: '--surface',
      size: 'body',
      archetypes: ARCHETYPES,
      minRatio: AA_THRESHOLDS.body,
      role: 'excluded — fails body AA',
    };
    expect(pairingPassesAa(bad)).toBe(false);
    expect(pairingRatio(bad)).toBeLessThan(AA_THRESHOLDS.body);
  });
});
