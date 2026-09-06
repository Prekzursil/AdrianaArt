import { CheckoutComponent } from './checkout.component';

describe('CheckoutComponent describeCouponReasons (golden WU)', () => {
  function createCmp() {
    const cmp = Object.create(CheckoutComponent.prototype) as CheckoutComponent;
    (cmp as any).translate = {
      instant: (key: string) => {
        if (key === 'checkout.couponNotEligible') return 'Not eligible';
        if (key === 'checkout.couponReasons.min_subtotal') return 'Min subtotal';
        return key;
      },
    };
    return cmp;
  }

  it('falls back when empty and joins translated known reasons', () => {
    const cmp = createCmp();
    expect(cmp.describeCouponReasons([])).toBe('Not eligible');
    expect(cmp.describeCouponReasons(null as any)).toBe('Not eligible');
    expect(cmp.describeCouponReasons(['min_subtotal', 'mystery'])).toBe('Min subtotal • mystery');
  });
});
