import { CheckoutComponent } from './checkout.component';

/** Golden WU checkout-describe-coupon-offer — describeCouponOffer. */
describe('CheckoutComponent describeCouponOffer (golden WU)', () => {
  function make(savings: number) {
    const cmp = Object.create(CheckoutComponent.prototype) as CheckoutComponent;
    (cmp as any).translate = {
      instant: (key: string, params?: Record<string, string>) =>
        params ? `${key}:${JSON.stringify(params)}` : key,
    };
    (cmp as any).couponOfferSavings = () => savings;
    return cmp;
  }

  it('labels free_shipping / amount / percent and appends savings when positive', () => {
    const cmp = make(0);
    expect(
      cmp.describeCouponOffer({
        coupon: { code: 'SHIP', promotion: { discount_type: 'free_shipping' } },
      } as any),
    ).toBe('SHIP · account.coupons.freeShipping');
    expect(
      cmp.describeCouponOffer({
        coupon: { code: 'AMT', promotion: { discount_type: 'amount', amount_off: '5' } },
      } as any),
    ).toBe('AMT · account.coupons.amountOff:{"value":"5"}');
    expect(
      cmp.describeCouponOffer({
        coupon: { code: 'PCT', promotion: { discount_type: 'percentage', percentage_off: '10' } },
      } as any),
    ).toBe('PCT · account.coupons.percentOff:{"value":"10"}');
    expect(cmp.describeCouponOffer({ coupon: { code: 'BARE', promotion: null } } as any)).toBe(
      'BARE',
    );
    const rich = make(3.5);
    expect(
      rich.describeCouponOffer({
        coupon: { code: 'RICH', promotion: { discount_type: 'free_shipping' } },
      } as any),
    ).toBe('RICH · account.coupons.freeShipping · ≈3.50 RON');
  });
});
