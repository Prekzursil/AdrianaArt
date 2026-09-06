import { PAIRINGS, pairingPassesAa } from './pairing-matrix';

/** Golden WU pairing-passes-aa-fn -- pairingPassesAa. */
describe('pairingPassesAa (golden WU)', () => {
  it('passes the curated text-on-background pairing', () => {
    const pair = PAIRINGS.find((p) => p.id === 'text-on-background');
    expect(pair).toBeTruthy();
    expect(pairingPassesAa(pair!)).toBe(true);
  });
});
