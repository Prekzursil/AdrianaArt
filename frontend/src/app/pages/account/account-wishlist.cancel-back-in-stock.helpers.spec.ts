import { AccountWishlistComponent } from './account-wishlist.component';

/** Golden WU account-wishlist-cancel-back-in-stock -- cancelBackInStock. */
describe('AccountWishlistComponent cancelBackInStock (golden WU)', () => {
  it('returns early when no existing request', () => {
    const cmp = Object.create(AccountWishlistComponent.prototype) as AccountWishlistComponent;
    Object.assign(cmp as any, {
      backInStockRequest: jasmine.createSpy('req').and.returnValue(null),
      catalog: { cancelBackInStock: jasmine.createSpy('cancel') },
    });
    cmp.cancelBackInStock({ id: 'p1', slug: 'mug' } as any);
    expect((cmp as any).catalog.cancelBackInStock).not.toHaveBeenCalled();
  });
});
