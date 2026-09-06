import { AdminCouponsComponent } from './admin-coupons.component';

/** Golden WU coupons-format-ron — formatRon. */
describe('AdminCouponsComponent formatRon (golden WU)', () => {
  function bare(): AdminCouponsComponent {
    return Object.create(AdminCouponsComponent.prototype) as AdminCouponsComponent;
  }

  it('formats finite numbers and blanks null/NaN', () => {
    const cmp = bare();
    expect(cmp.formatRon(null)).toBe('—');
    expect(cmp.formatRon(Number.NaN)).toBe('—');
    expect(cmp.formatRon(12.5)).toBe('12.50 RON');
    expect(cmp.formatRon(0)).toBe('0.00 RON');
  });
});
