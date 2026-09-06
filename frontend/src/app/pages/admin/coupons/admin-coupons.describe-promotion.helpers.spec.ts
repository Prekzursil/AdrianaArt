import { AdminCouponsComponent } from './admin-coupons.component';

/** Golden WU — describePromotion discount summary arms. */
describe('AdminCouponsComponent describePromotion (golden WU)', () => {
  function bare(): AdminCouponsComponent {
    const cmp = Object.create(AdminCouponsComponent.prototype) as AdminCouponsComponent;
    (cmp as any).t = (key: string, params?: Record<string, unknown>) =>
      params ? `${key}:${JSON.stringify(params)}` : key;
    return cmp;
  }

  it('returns empty for falsy promo', () => {
    expect(bare().describePromotion(null as any)).toBe('');
    expect(bare().describePromotion(undefined as any)).toBe('');
  });

  it('maps free_shipping / amount / percent summaries', () => {
    const cmp = bare();
    expect(cmp.describePromotion({ discount_type: 'free_shipping' } as any)).toBe(
      'adminUi.couponsV2.discountSummary.freeShipping',
    );
    expect(cmp.describePromotion({ discount_type: 'amount', amount_off: '5' } as any)).toContain(
      'amountOff',
    );
    expect(cmp.describePromotion({ discount_type: 'amount' } as any)).toContain('"value":"0"');
    expect(
      cmp.describePromotion({ discount_type: 'percent', percentage_off: '15' } as any),
    ).toContain('percentOff');
  });
});
