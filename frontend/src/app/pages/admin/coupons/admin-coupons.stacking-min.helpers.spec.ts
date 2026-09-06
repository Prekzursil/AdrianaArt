import { AdminCouponsComponent } from './admin-coupons.component';

/** Golden WU coupons-stacking-min-helpers. */
describe('AdminCouponsComponent stackingMinSubtotalBlocked (golden WU)', () => {
  function bare(overrides: Record<string, unknown> = {}): AdminCouponsComponent {
    const cmp = Object.create(AdminCouponsComponent.prototype) as AdminCouponsComponent;
    Object.assign(cmp as any, {
      promotionForm: { min_subtotal: '' },
      stackingSampleSubtotal: '',
      ...overrides,
    });
    return cmp;
  }

  it('returns false when min or sample missing/non-positive', () => {
    expect(bare().stackingMinSubtotalBlocked()).toBe(false);
    expect(
      bare({ promotionForm: { min_subtotal: '0' }, stackingSampleSubtotal: '10' }).stackingMinSubtotalBlocked(),
    ).toBe(false);
    expect(
      bare({ promotionForm: { min_subtotal: '50' }, stackingSampleSubtotal: '' }).stackingMinSubtotalBlocked(),
    ).toBe(false);
  });

  it('returns true when sample subtotal is below min', () => {
    expect(
      bare({
        promotionForm: { min_subtotal: '100' },
        stackingSampleSubtotal: '40',
      }).stackingMinSubtotalBlocked(),
    ).toBe(true);
    expect(
      bare({
        promotionForm: { min_subtotal: '100' },
        stackingSampleSubtotal: '100',
      }).stackingMinSubtotalBlocked(),
    ).toBe(false);
  });
});
