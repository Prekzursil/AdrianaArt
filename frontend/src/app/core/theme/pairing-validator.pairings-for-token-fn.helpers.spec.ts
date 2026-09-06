import { pairingsForToken } from './pairing-validator';

/** Golden WU pairings-for-token-fn -- pairingsForToken. */
describe('pairingsForToken (golden WU)', () => {
  it('returns pairings that include --text as an endpoint', () => {
    const pairs = pairingsForToken('--text');
    expect(pairs.length).toBeGreaterThan(0);
    expect(
      pairs.every((p) => p.foreground === '--text' || p.background === '--text'),
    ).toBe(true);
  });
});
