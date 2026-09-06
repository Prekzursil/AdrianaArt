import { PAIRINGS } from './pairing-matrix';
import { pairingsForToken } from './pairing-validator';

/** Golden WU pairings-for-token — pairingsForToken. */
describe('pairingsForToken (golden WU)', () => {
  it('returns curated pairings where token is foreground or background', () => {
    const sample = PAIRINGS[0];
    expect(sample).toBeTruthy();
    const asFg = pairingsForToken(sample.foreground);
    expect(asFg.length).toBeGreaterThan(0);
    expect(
      asFg.every((p) => p.foreground === sample.foreground || p.background === sample.foreground),
    ).toBe(true);

    const asBg = pairingsForToken(sample.background);
    expect(asBg.length).toBeGreaterThan(0);
    expect(
      asBg.every((p) => p.foreground === sample.background || p.background === sample.background),
    ).toBe(true);

    expect(pairingsForToken('color.does-not-exist')).toEqual([]);
  });
});
