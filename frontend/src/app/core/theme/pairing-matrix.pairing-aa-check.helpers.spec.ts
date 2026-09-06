import { PAIRINGS, pairingPassesAa } from './pairing-matrix';

/** Golden WU pairing-aa-check -- pairingPassesAa. */
describe('pairingPassesAa (golden WU)', () => {
  it('marks every compiled-default pairing as AA-passing', () => {
    expect(PAIRINGS.length).toBeGreaterThan(5);
    expect(PAIRINGS.every((p) => pairingPassesAa(p))).toBe(true);
  });
});
