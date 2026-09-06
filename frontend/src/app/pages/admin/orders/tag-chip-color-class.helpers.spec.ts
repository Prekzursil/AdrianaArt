import { tagChipColorClass } from './order-tag-colors';

describe('tagChipColorClass (golden WU)', () => {
  it('returns a class string for known tags', () => {
    const cls = tagChipColorClass('vip', {});
    expect(cls).toContain('violet');
    expect(tagChipColorClass('', {})).toContain('slate');
  });
});
