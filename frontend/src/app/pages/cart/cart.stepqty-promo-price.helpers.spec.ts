import { CartComponent } from './cart.component';

/** Golden WU cart-stepqty-promo-price — stepQuantity / clearPromo / displayProductPrice / stock gates. */
describe('CartComponent stepqty/promo/price helpers (golden WU)', () => {
  function createCmp(overrides: Record<string, unknown> = {}) {
    const cmp = Object.create(CartComponent.prototype) as CartComponent;
    Object.assign(cmp as any, {
      onQuantityChange: jasmine.createSpy('onQuantityChange'),
      resetPromoState: jasmine.createSpy('resetPromoState'),
      cart: { loadFromBackend: jasmine.createSpy('loadFromBackend') },
      promo: 'SAVE',
      promoMessage: 'ok',
      promoStatus: 'success',
      promoValid: true,
      appliedCouponOffer: { code: 'SAVE' },
      ...overrides,
    });
    return cmp;
  }

  it('stepQuantity forwards id and next quantity', () => {
    const cmp = createCmp();
    cmp.stepQuantity({ id: 'i1', quantity: 2 } as any, 1);
    expect((cmp as any).onQuantityChange).toHaveBeenCalledWith('i1', 3);
  });

  it('clearPromo resets promo state and reloads cart', () => {
    const cmp = createCmp();
    cmp.clearPromo();
    expect((cmp as any).resetPromoState).toHaveBeenCalled();
    expect((cmp as any).cart.loadFromBackend).toHaveBeenCalled();
  });

  it('isLowStock / isMaxQuantity gate on stock', () => {
    const cmp = createCmp();
    expect(cmp.isLowStock({ stock: 2, quantity: 1 } as any)).toBe(true);
    expect(cmp.isLowStock({ stock: 0, quantity: 1 } as any)).toBe(false);
    expect(cmp.isMaxQuantity({ stock: 2, quantity: 2 } as any)).toBe(true);
    expect(cmp.isMaxQuantity({ stock: 2, quantity: 1 } as any)).toBe(false);
  });

  it('displayProductPrice prefers finite sale below base', () => {
    const cmp = createCmp();
    expect(cmp.displayProductPrice({ base_price: 40, sale_price: 25 } as any)).toBe(25);
    expect(cmp.displayProductPrice({ base_price: 40, sale_price: 50 } as any)).toBe(40);
    expect(cmp.displayProductPrice({ base_price: 40, sale_price: null } as any)).toBe(40);
  });
});
