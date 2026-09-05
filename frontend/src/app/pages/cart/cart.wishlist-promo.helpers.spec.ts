import { of, throwError } from 'rxjs';
import { CartComponent } from './cart.component';

describe('CartComponent moveToWishlist / clearPromo (golden WU)', () => {
  function createCmp(overrides: Record<string, unknown> = {}) {
    const cmp = Object.create(CartComponent.prototype) as CartComponent;
    Object.assign(cmp as any, {
      auth: { isAuthenticated: () => true },
      cart: {
        remove: jasmine.createSpy('remove'),
        loadFromBackend: jasmine.createSpy('loadFromBackend'),
      },
      wishlist: {
        isWishlisted: jasmine.createSpy('isWishlisted').and.returnValue(false),
        add: jasmine.createSpy('add').and.returnValue(of({ id: 'p1', name: 'Mug' })),
        addLocal: jasmine.createSpy('addLocal'),
      },
      toast: {
        info: jasmine.createSpy('info'),
        success: jasmine.createSpy('success'),
        error: jasmine.createSpy('error'),
      },
      translate: { instant: (k: string) => k },
      movingToWishlist: {},
      promo: 'SAVE10',
      promoMessage: 'ok',
      promoStatus: 'success',
      promoValid: true,
      appliedCouponOffer: { code: 'SAVE10' },
      ...overrides,
    });
    return cmp;
  }

  it('moveToWishlist no-ops when unauthenticated or missing product_id', () => {
    const denied = createCmp({ auth: { isAuthenticated: () => false } });
    denied.moveToWishlist({ id: 'l1', product_id: 'p1', name: 'Mug' } as any);
    expect((denied as any).wishlist.add).not.toHaveBeenCalled();

    const missing = createCmp();
    missing.moveToWishlist({ id: 'l1', product_id: '', name: 'Mug' } as any);
    expect((missing as any).wishlist.add).not.toHaveBeenCalled();
  });

  it('moveToWishlist removes immediately when already wishlisted', () => {
    const cmp = createCmp({
      wishlist: {
        isWishlisted: () => true,
        add: jasmine.createSpy('add'),
        addLocal: jasmine.createSpy('addLocal'),
      },
    });
    cmp.moveToWishlist({ id: 'l1', product_id: 'p1', name: 'Mug' } as any);
    expect((cmp as any).cart.remove).toHaveBeenCalledWith('l1');
    expect((cmp as any).toast.info).toHaveBeenCalled();
    expect((cmp as any).wishlist.add).not.toHaveBeenCalled();
  });

  it('moveToWishlist adds then removes on success; toasts on error', () => {
    const cmp = createCmp();
    cmp.moveToWishlist({ id: 'l1', product_id: 'p1', name: 'Mug' } as any);
    expect((cmp as any).wishlist.add).toHaveBeenCalledWith('p1');
    expect((cmp as any).wishlist.addLocal).toHaveBeenCalled();
    expect((cmp as any).cart.remove).toHaveBeenCalledWith('l1');
    expect((cmp as any).toast.success).toHaveBeenCalled();

    const failing = createCmp({
      wishlist: {
        isWishlisted: () => false,
        add: jasmine
          .createSpy('add')
          .and.returnValue(throwError(() => ({ error: { detail: 'x' } }))),
        addLocal: jasmine.createSpy('addLocal'),
      },
    });
    failing.moveToWishlist({ id: 'l2', product_id: 'p2', name: 'Cup' } as any);
    expect((failing as any).toast.error).toHaveBeenCalled();
    expect((failing as any).movingToWishlist['l2']).toBeUndefined();
  });

  it('clearPromo resets promo fields and reloads cart', () => {
    const cmp = createCmp();
    cmp.clearPromo();
    expect((cmp as any).promo).toBe('');
    expect((cmp as any).promoMessage).toBe('');
    expect((cmp as any).promoStatus).toBe('info');
    expect((cmp as any).promoValid).toBe(true);
    expect((cmp as any).appliedCouponOffer).toBeNull();
    expect((cmp as any).cart.loadFromBackend).toHaveBeenCalled();
  });
});
