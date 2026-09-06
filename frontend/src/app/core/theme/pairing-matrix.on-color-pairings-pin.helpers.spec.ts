import { ON_COLOR_PAIRINGS } from './pairing-matrix';

/** Golden WU on-color-pairings-pin -- ON_COLOR_PAIRINGS. */
describe('ON_COLOR_PAIRINGS (golden WU)', () => {
  it('pins inverse and onmedia derived pairings', () => {
    expect(ON_COLOR_PAIRINGS.length).toBe(2);
    expect(ON_COLOR_PAIRINGS[0]?.onColor).toBe('--text-inverse');
    expect(ON_COLOR_PAIRINGS[1]?.onColor).toBe('--text-onmedia');
  });
});
