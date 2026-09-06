import { PAIRINGS, pairingRatio } from './pairing-matrix';

/** Golden WU pairing-ratio-check -- pairingRatio. */
describe('pairingRatio (golden WU)', () => {
  it('returns a WCAG ratio above 1 for text-on-background', () => {
    const pair = PAIRINGS.find((p) => p.id === 'text-on-background');
    expect(pair).toBeTruthy();
    const ratio = pairingRatio(pair!);
    expect(ratio).toBeGreaterThan(4);
    expect(ratio).toBeLessThanOrEqual(21);
  });
});
