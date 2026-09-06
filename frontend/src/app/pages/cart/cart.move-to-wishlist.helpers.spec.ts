import { CartComponent } from './cart.component';

/** Golden WU cart-move-to-wishlist -- moveToWishlist. */
describe('CartComponent moveToWishlist (golden WU)', () => {
  it('returns early when unauthenticated', () => {
    const cmp = Object.create(CartComponent.prototype) as CartComponent;
    Object.assign(cmp as any, {
      auth: { isAuthenticated: jasmine.createSpy('auth').and.returnValue(false) },
      wishlist: { isWishlisted: jasmine.createSpy('isWishlisted') },
      cart: { remove: jasmine.createSpy('remove') },
    });
    cmp.moveToWishlist({ id: 'c1', product_id: 'p1', name: 'Item' } as any);
    expect((cmp as any).wishlist.isWishlisted).not.toHaveBeenCalled();
    expect((cmp as any).cart.remove).not.toHaveBeenCalled();
  });
});
