import { pairingsForToken } from './pairing-validator';

/** Golden WU pairings-for-token — pairingsForToken. */
describe('pairingsForToken (golden WU)', () => {
  it('returns curated pairings where token is fg or bg', () => {
    const asFg = pairingsForToken('color.text');
    expect(asFg.length).toBeGreaterThan(0);
    expect(asFg.every((p) => p.foreground === 'color.text' || p.background === 'color.text')).toBe(
      true,
    );
    const asBg = pairingsForToken('color.bg');
    expect(asBg.length).toBeGreaterThan(0);
    expect(asBg.every((p) => p.foreground === 'color.bg' || p.background === 'color.bg')).toBe(
      true,
    );
    expect(pairingsForToken('color.does-not-exist')).toEqual([]);
  });
});
