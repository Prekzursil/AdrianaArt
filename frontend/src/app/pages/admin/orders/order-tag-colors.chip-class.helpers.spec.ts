import { tagChipColorClass } from './order-tag-colors';

/** Golden WU tag-chip-color-class-fn -- tagChipColorClass. */
describe('tagChipColorClass (golden WU)', () => {
  it('returns violet chip classes for vip without overrides', () => {
    const cls = tagChipColorClass('vip', {});
    expect(cls).toContain('border-violet-200');
    expect(cls).toContain('text-violet-800');
  });
});
