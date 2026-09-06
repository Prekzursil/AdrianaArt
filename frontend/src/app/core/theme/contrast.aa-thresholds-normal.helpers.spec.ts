import { AA_THRESHOLDS } from './contrast';

/** Golden WU aa-thresholds-normal -- AA_THRESHOLDS.body. */
describe('AA_THRESHOLDS.body (golden WU)', () => {
  it('pins WCAG AA body text at 4.5:1', () => {
    expect(AA_THRESHOLDS.body).toBe(4.5);
    expect(AA_THRESHOLDS.large).toBeLessThan(AA_THRESHOLDS.body);
  });
});
