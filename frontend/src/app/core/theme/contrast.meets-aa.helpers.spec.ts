import { AA_THRESHOLDS, meetsAa } from './contrast';

/** Golden WU meets-aa -- meetsAa. */
describe('meetsAa (golden WU)', () => {
  it('compares ratio against body/large AA thresholds inclusively', () => {
    expect(meetsAa(AA_THRESHOLDS.body, 'body')).toBe(true);
    expect(meetsAa(AA_THRESHOLDS.body - 0.01, 'body')).toBe(false);
    expect(meetsAa(AA_THRESHOLDS.large, 'large')).toBe(true);
    expect(meetsAa(2.9, 'large')).toBe(false);
  });
});
