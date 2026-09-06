import { PAIRINGS, pairingPassesAa } from './pairing-matrix';

/** Golden WU pairing-passes-aa — pairingPassesAa. */
describe('pairingPassesAa (golden WU)', () => {
  it('returns true for curated known-good pairings', () => {
    expect(PAIRINGS.length).toBeGreaterThan(0);
    expect(pairingPassesAa(PAIRINGS[0])).toBe(true);
  });
});
