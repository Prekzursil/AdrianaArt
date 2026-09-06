import { AA_THRESHOLDS } from './contrast';

/** Golden WU aa-large-ratio -- AA_THRESHOLDS.large. */
describe('AA_THRESHOLDS.large (golden WU)', () => {
  it('pins WCAG AA large text at 3:1', () => {
    expect(AA_THRESHOLDS.large).toBe(3);
    expect(Object.keys(AA_THRESHOLDS).sort()).toEqual(['body', 'large']);
  });
});
