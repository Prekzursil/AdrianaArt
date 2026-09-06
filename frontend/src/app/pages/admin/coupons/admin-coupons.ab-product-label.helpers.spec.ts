import { AdminCouponsComponent } from './admin-coupons.component';

/** Golden WU coupons-ab-product-label-helpers. */
describe('AdminCouponsComponent ab/productLabel helpers (golden WU)', () => {
  function bare(overrides: Record<string, unknown> = {}): AdminCouponsComponent {
    const cmp = Object.create(AdminCouponsComponent.prototype) as AdminCouponsComponent;
    Object.assign(cmp as any, {
      selectedCoupon: () => null,
      abCouponB: () => null,
      productCache: {},
      ...overrides,
    });
    return cmp;
  }

  it('abCanRun requires assigned coupon A (and B if set)', () => {
    expect(bare().abCanRun()).toBe(false);
    expect(
      bare({ selectedCoupon: () => ({ visibility: 'public' }) }).abCanRun(),
    ).toBe(false);
    expect(
      bare({ selectedCoupon: () => ({ visibility: 'assigned' }) }).abCanRun(),
    ).toBe(true);
    expect(
      bare({
        selectedCoupon: () => ({ visibility: 'assigned' }),
        abCouponB: () => ({ visibility: 'public' }),
      }).abCanRun(),
    ).toBe(false);
  });

  it('productLabel prefers cache name else id', () => {
    const cmp = bare({ productCache: { p1: { name: 'Mug' } } });
    expect(cmp.productLabel('p1')).toBe('Mug');
    expect(cmp.productLabel('missing')).toBe('missing');
  });
});
