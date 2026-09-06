import { ON_COLOR_PAIRINGS } from './pairing-matrix';

/** Golden WU on-color-pairings -- ON_COLOR_PAIRINGS. */
describe('ON_COLOR_PAIRINGS (golden WU)', () => {
  it('pins inverse and onmedia pairing ids', () => {
    expect(ON_COLOR_PAIRINGS.length).toBe(2);
    expect(ON_COLOR_PAIRINGS.map((p) => p.id)).toEqual([
      'text-inverse-on-surface-inverse',
      'text-onmedia-on-accent',
    ]);
  });
});
