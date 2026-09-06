import { AdminCouponsComponent } from './admin-coupons.component';

/** Golden WU coupons-ab-can-run — abCanRun. */
describe('AdminCouponsComponent abCanRun (golden WU)', () => {
  function createCmp(couponA: any, couponB: any) {
    const cmp = Object.create(AdminCouponsComponent.prototype) as AdminCouponsComponent;
    (cmp as any).selectedCoupon = () => couponA;
    (cmp as any).abCouponB = () => couponB;
    return cmp;
  }

  it('requires assigned visibility on A and optional B', () => {
    expect(createCmp(null, null).abCanRun()).toBe(false);
    expect(createCmp({ visibility: 'public' }, null).abCanRun()).toBe(false);
    expect(createCmp({ visibility: 'assigned' }, null).abCanRun()).toBe(true);
    expect(createCmp({ visibility: 'assigned' }, { visibility: 'public' }).abCanRun()).toBe(false);
    expect(createCmp({ visibility: 'assigned' }, { visibility: 'assigned' }).abCanRun()).toBe(true);
  });
});
