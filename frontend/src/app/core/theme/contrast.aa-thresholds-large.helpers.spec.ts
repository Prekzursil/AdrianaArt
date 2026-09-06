import { AA_THRESHOLDS } from './contrast';

/** Golden WU aa-thresholds-large -- AA_THRESHOLDS.large. */
describe('AA_THRESHOLDS.large (golden WU)', () => {
  it('pins the WCAG AA large-text ratio at 3:1', () => {
    expect(AA_THRESHOLDS.large).toBe(3);
    expect(AA_THRESHOLDS.body).toBe(4.5);
  });
});
