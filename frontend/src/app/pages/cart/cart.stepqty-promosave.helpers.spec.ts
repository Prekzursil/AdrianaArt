import { CartComponent } from './cart.component';

describe('CartComponent stepQuantity / quotePromoSavings (golden WU)', () => {
  function createCmp(overrides: Record<string, unknown> = {}) {
    const cmp = Object.create(CartComponent.prototype) as CartComponent;
    Object.assign(cmp as any, {
      onQuantityChange: jasmine.createSpy('onQuantityChange'),
      quote: () => ({ subtotal: 100, fee: 5, tax: 19, shipping: 15, total: 120 }),
      promo: 'SAVE',
      appliedCouponOffer: {
        eligible: true,
        coupon: { code: 'SAVE' },
        estimated_shipping_discount_ron: '10.00',
      },
      ...overrides,
    });
    return cmp;
  }

  it('stepQuantity forwards id and next quantity', () => {
    const cmp = createCmp();
    cmp.stepQuantity({ id: 'l1', quantity: 2 } as any, 1);
    expect((cmp as any).onQuantityChange).toHaveBeenCalledWith('l1', 3);
    cmp.stepQuantity({ id: 'l1', quantity: 2 } as any, -1);
    expect((cmp as any).onQuantityChange).toHaveBeenCalledWith('l1', 1);
  });

  it('quotePromoSavings adds quote discount and coupon shipping discount', () => {
    const cmp = createCmp();
    // quoteDiscount = max(0, 100+5+19+15-120) = 19
    expect(cmp.quoteDiscount()).toBe(19);
    expect(cmp.quotePromoSavings()).toBe(29);

    const none = createCmp({
      appliedCouponOffer: null,
      quote: () => ({ subtotal: 50, fee: 0, tax: 0, shipping: 0, total: 50 }),
    });
    expect(none.quoteDiscount()).toBe(0);
    expect(none.quotePromoSavings()).toBe(0);
  });
});
