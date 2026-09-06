import { AdminCouponsComponent } from './admin-coupons.component';

/** Golden WU coupons-format-ron-pair-helpers. */
describe('AdminCouponsComponent formatRon helpers (golden WU)', () => {
  function bare(): AdminCouponsComponent {
    return Object.create(AdminCouponsComponent.prototype) as AdminCouponsComponent;
  }

  it('formatRon renders finite amounts or em dash', () => {
    const cmp = bare();
    expect(cmp.formatRon(null)).toBe('—');
    expect(cmp.formatRon(Number.NaN)).toBe('—');
    expect(cmp.formatRon(12.5)).toBe('12.50 RON');
  });

  it('formatRonString parses string amounts via optionalNumber', () => {
    const cmp = bare();
    expect(cmp.formatRonString(null)).toBe('—');
    expect(cmp.formatRonString('')).toBe('—');
    expect(cmp.formatRonString('3.2')).toBe('3.20 RON');
  });
});
