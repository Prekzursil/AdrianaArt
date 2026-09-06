import { AdminCouponsComponent } from './admin-coupons.component';

/** Golden WU coupons-default-ab-bucket-seed -- defaultAbBucketSeed. */
describe('AdminCouponsComponent defaultAbBucketSeed (golden WU)', () => {
  it('builds ab:A:B when both coupons selected else ab-test', () => {
    const cmp = Object.create(AdminCouponsComponent.prototype) as AdminCouponsComponent;
    Object.assign(cmp as any, {
      selectedCoupon: jasmine.createSpy('selectedCoupon').and.returnValue(null),
      abCouponB: jasmine.createSpy('abCouponB').and.returnValue(null),
    });
    expect((cmp as any).defaultAbBucketSeed()).toBe('ab-test');
    (cmp as any).selectedCoupon.and.returnValue({ id: 'a1' });
    (cmp as any).abCouponB.and.returnValue({ id: 'b2' });
    expect((cmp as any).defaultAbBucketSeed()).toBe('ab:a1:b2');
  });
});
