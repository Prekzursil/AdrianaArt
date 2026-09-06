import { AdminCouponsComponent } from './admin-coupons.component';

/** Golden WU coupons-suggested-prefix — suggestedCouponPrefix. */
describe('AdminCouponsComponent suggestedCouponPrefix (golden WU)', () => {
  it('prefers promotion key/name and falls back to COUPON', () => {
    const cmp = Object.create(AdminCouponsComponent.prototype) as AdminCouponsComponent;
    const fn = (AdminCouponsComponent.prototype as any).suggestedCouponPrefix as (
      this: AdminCouponsComponent,
    ) => string;
    (cmp as any).selectedPromotion = () => ({ key: ' spring ' });
    expect(fn.call(cmp)).toBe('spring');
    (cmp as any).selectedPromotion = () => ({ name: 'Summer Sale' });
    expect(fn.call(cmp)).toBe('Summer Sale');
    (cmp as any).selectedPromotion = () => ({ key: '   ', name: '  ' });
    expect(fn.call(cmp)).toBe('COUPON');
    (cmp as any).selectedPromotion = () => null;
    expect(fn.call(cmp)).toBe('COUPON');
  });
});
