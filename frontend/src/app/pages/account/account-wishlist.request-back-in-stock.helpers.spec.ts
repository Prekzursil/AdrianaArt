import { AccountWishlistComponent } from './account-wishlist.component';

/** Golden WU account-wishlist-request-back-in-stock -- requestBackInStock. */
describe('AccountWishlistComponent requestBackInStock (golden WU)', () => {
  it('returns early when item is not out of stock', () => {
    const cmp = Object.create(AccountWishlistComponent.prototype) as AccountWishlistComponent;
    Object.assign(cmp as any, {
      isOutOfStock: jasmine.createSpy('oos').and.returnValue(false),
      backInStockRequest: jasmine.createSpy('req'),
      catalog: { requestBackInStock: jasmine.createSpy('catalog') },
    });
    cmp.requestBackInStock({ id: 'p1', slug: 'mug' } as any);
    expect((cmp as any).catalog.requestBackInStock).not.toHaveBeenCalled();
  });
});
