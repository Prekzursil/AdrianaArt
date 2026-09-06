import { AdminCouponsComponent } from './admin-coupons.component';

/** Golden WU coupons-describe-promotion — describePromotion. */
describe('AdminCouponsComponent describePromotion (golden WU)', () => {
  it('summarizes discount types via t()', () => {
    const cmp = Object.create(AdminCouponsComponent.prototype) as AdminCouponsComponent;
    (cmp as any).t = (key: string, params?: Record<string, string>) =>
      params ? `${key}:${JSON.stringify(params)}` : key;
    expect(cmp.describePromotion(null as any)).toBe('');
    expect(cmp.describePromotion({ discount_type: 'free_shipping' } as any)).toBe(
      'adminUi.couponsV2.discountSummary.freeShipping',
    );
    expect(cmp.describePromotion({ discount_type: 'amount', amount_off: '5' } as any)).toBe(
      'adminUi.couponsV2.discountSummary.amountOff:{\"value\":\"5\"}\',
    );
    expect(
      cmp.describePromotion({ discount_type: 'percentage', percentage_off: '10' } as any),
    ).toBe('adminUi.couponsV2.discountSummary.percentOff:{\"value\":\"10\"}\');
  });
});
