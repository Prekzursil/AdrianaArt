import { AdminCouponsComponent } from './admin-coupons.component';

/** Golden WU coupons-stacking-min-subtotal-blocked — stackingMinSubtotalBlocked. */
describe('AdminCouponsComponent stackingMinSubtotalBlocked (golden WU)', () => {
  function bare(min: unknown, sample: unknown): AdminCouponsComponent {
    const cmp = Object.create(AdminCouponsComponent.prototype) as AdminCouponsComponent;
    Object.assign(cmp as any, {
      promotionForm: { min_subtotal: min },
      stackingSampleSubtotal: sample,
    });
    return cmp;
  }

  it('blocks only when sample subtotal is below positive min', () => {
    expect(bare(null, 10).stackingMinSubtotalBlocked()).toBe(false);
    expect(bare(0, 10).stackingMinSubtotalBlocked()).toBe(false);
    expect(bare(50, null).stackingMinSubtotalBlocked()).toBe(false);
    expect(bare(50, 49).stackingMinSubtotalBlocked()).toBe(true);
    expect(bare('50', '50').stackingMinSubtotalBlocked()).toBe(false);
    expect(bare('50', '49.5').stackingMinSubtotalBlocked()).toBe(true);
  });
});
