import { AA_THRESHOLDS } from './contrast';

/** Golden WU aa-thresholds -- AA_THRESHOLDS. */
describe('AA_THRESHOLDS (golden WU)', () => {
  it('pins WCAG body 4.5 and large 3', () => {
    expect(AA_THRESHOLDS.body).toBe(4.5);
    expect(AA_THRESHOLDS.large).toBe(3);
    expect(AA_THRESHOLDS.body).toBeGreaterThan(AA_THRESHOLDS.large);
  });
});
