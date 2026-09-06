import { scanCoreLiterals } from './core-literal-guard';

/** Golden WU scan-core-literals-fn -- scanCoreLiterals. */
describe('scanCoreLiterals (golden WU)', () => {
  it('flags bg-white and ignores decorative families', () => {
    expect(scanCoreLiterals('bg-white').map((f) => f.text)).toEqual(['bg-white']);
    expect(scanCoreLiterals('bg-amber-50 text-red-600')).toEqual([]);
  });
});
