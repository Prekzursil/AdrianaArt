import { CartComponent } from './cart.component';

/** Golden WU cart-clear-promo-helpers. */
describe('CartComponent clear/promo helpers (golden WU)', () => {
  function bare(overrides: Record<string, unknown> = {}): CartComponent {
    const cmp = Object.create(CartComponent.prototype) as CartComponent;
    Object.assign(cmp as any, {
      promo: 'X',
      promoMessage: 'm',
      promoStatus: 'error',
      promoValid: false,
      appliedCouponOffer: { code: 'X' },
      cart: { loadFromBackend: jasmine.createSpy('load'), clear: jasmine.createSpy('clear') },
      translate: { instant: (k: string) => k },
      itemErrors: { a: 1 },
      movingToWishlist: { a: true },
      ...overrides,
    });
    return cmp;
  }

  it('resetPromoState clears promo fields', () => {
    const cmp = bare();
    (CartComponent.prototype as any).resetPromoState.call(cmp);
    expect((cmp as any).promo).toBe('');
    expect((cmp as any).promoValid).toBe(true);
    expect((cmp as any).appliedCouponOffer).toBeNull();
  });

  it('clearPromo resets and reloads cart', () => {
    const cmp = bare();
    cmp.clearPromo();
    expect((cmp as any).promo).toBe('');
    expect((cmp as any).cart.loadFromBackend).toHaveBeenCalled();
  });

  it('clearCart confirms then clears', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    const cmp = bare();
    cmp.clearCart();
    expect((cmp as any).cart.clear).toHaveBeenCalled();
    expect((cmp as any).itemErrors).toEqual({});
    expect((cmp as any).promo).toBe('');
  });
});
