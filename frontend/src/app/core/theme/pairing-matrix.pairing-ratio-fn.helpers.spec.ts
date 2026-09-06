import { PAIRINGS, pairingRatio } from './pairing-matrix';

/** Golden WU pairing-ratio-fn -- pairingRatio. */
describe('pairingRatio (golden WU)', () => {
  it('returns a finite AA-capable ratio for text-on-background', () => {
    const pair = PAIRINGS.find((p) => p.id === 'text-on-background');
    expect(pair).toBeTruthy();
    const ratio = pairingRatio(pair!);
    expect(Number.isFinite(ratio)).toBe(true);
    expect(ratio).toBeGreaterThan(4.5);
  });
});
