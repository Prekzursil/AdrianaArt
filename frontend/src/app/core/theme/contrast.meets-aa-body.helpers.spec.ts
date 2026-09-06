import { AA_THRESHOLDS, meetsAa } from './contrast';

/** Golden WU meets-aa-body -- meetsAa. */
describe('meetsAa (golden WU)', () => {
  it('treats the body threshold as inclusive', () => {
    expect(meetsAa(AA_THRESHOLDS.body, 'body')).toBe(true);
    expect(meetsAa(AA_THRESHOLDS.body - 0.01, 'body')).toBe(false);
    expect(meetsAa(AA_THRESHOLDS.large, 'large')).toBe(true);
  });
});
