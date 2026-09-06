import { PAIRINGS, pairingRatio } from './pairing-matrix';

/** Golden WU pairing-ratio — pairingRatio. */
describe('pairingRatio (golden WU)', () => {
  it('returns a ratio at or above the pairing minRatio', () => {
    const pair = PAIRINGS[0];
    expect(pairingRatio(pair)).toBeGreaterThanOrEqual(pair.minRatio);
  });
});
