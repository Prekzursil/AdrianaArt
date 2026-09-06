import { AdminCouponsComponent } from './admin-coupons.component';

/** Golden WU — abCanRun + productLabel helpers. */
describe('AdminCouponsComponent abCanRun / productLabel (golden WU)', () => {
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

  it('abCanRun requires assigned coupon A and optional assigned B', () => {
    expect(bare().abCanRun()).toBe(false);
    expect(bare({ selectedCoupon: () => ({ visibility: 'public' }) }).abCanRun()).toBe(false);
    expect(bare({ selectedCoupon: () => ({ visibility: 'assigned' }) }).abCanRun()).toBe(true);
    expect(
      bare({
        selectedCoupon: () => ({ visibility: 'assigned' }),
        abCouponB: () => ({ visibility: 'public' }),
      }).abCanRun(),
    ).toBe(false);
    expect(
      bare({
        selectedCoupon: () => ({ visibility: 'assigned' }),
        abCouponB: () => ({ visibility: 'assigned' }),
      }).abCanRun(),
    ).toBe(true);
  });

  it('productLabel prefers cached name else id', () => {
    const cmp = bare({ productCache: { p1: { name: 'Lamp' } } });
    expect(cmp.productLabel('p1')).toBe('Lamp');
    expect(cmp.productLabel('missing')).toBe('missing');
  });
});
