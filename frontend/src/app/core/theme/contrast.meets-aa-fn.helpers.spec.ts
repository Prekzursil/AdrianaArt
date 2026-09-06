import { AA_THRESHOLDS, meetsAa } from './contrast';

/** Golden WU meets-aa-fn -- meetsAa. */
describe('meetsAa (golden WU)', () => {
  it('accepts the large threshold inclusively and rejects just below', () => {
    expect(meetsAa(AA_THRESHOLDS.large, 'large')).toBe(true);
    expect(meetsAa(AA_THRESHOLDS.large - 0.01, 'large')).toBe(false);
  });
});
