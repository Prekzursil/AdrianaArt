import { AccountCouponsComponent } from './account-coupons.component';

describe('AccountCouponsComponent describeDiscount / statusLabel (golden WU)', () => {
  function createCmp() {
    const cmp = Object.create(AccountCouponsComponent.prototype) as AccountCouponsComponent;
    (cmp as any).translate = {
      instant: (k: string, p?: any) => (p ? `${k}:${JSON.stringify(p)}` : k),
    };
    return cmp;
  }

  it('describeDiscount covers missing promo, free shipping, amount, percent', () => {
    const cmp = createCmp();
    expect(cmp.describeDiscount({ promotion: null } as any)).toBe('account.coupons.coupon');
    expect(cmp.describeDiscount({ promotion: { discount_type: 'free_shipping' } } as any)).toBe(
      'account.coupons.freeShipping',
    );
    expect(
      cmp.describeDiscount({ promotion: { discount_type: 'amount', amount_off: '15' } } as any),
    ).toContain('account.coupons.amountOff');
    expect(
      cmp.describeDiscount({
        promotion: { discount_type: 'percent', percentage_off: '10' },
      } as any),
    ).toContain('account.coupons.percentOff');
  });

  it('statusLabel returns expired / inactive / null for active', () => {
    const cmp = createCmp();
    const expired = cmp.statusLabel({
      ends_at: '2000-01-01T00:00:00Z',
      is_active: true,
      promotion: { is_active: true },
    } as any);
    expect(expired?.label).toBe('account.coupons.expired');

    const inactive = cmp.statusLabel({
      ends_at: null,
      is_active: false,
      promotion: { is_active: true },
    } as any);
    expect(inactive?.label).toMatch(/inactive|disabled|account.coupons/);

    const active = cmp.statusLabel({
      ends_at: null,
      is_active: true,
      promotion: { is_active: true },
    } as any);
    expect(active).toBeNull();
  });
});
