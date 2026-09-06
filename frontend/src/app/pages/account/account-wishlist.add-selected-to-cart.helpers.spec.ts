import { AccountWishlistComponent } from './account-wishlist.component';

/** Golden WU account-wishlist-add-selected-to-cart -- addSelectedToCart. */
describe('AccountWishlistComponent addSelectedToCart (golden WU)', () => {
  it('adds selected wishlist products to cart and toasts', () => {
    const cmp = Object.create(AccountWishlistComponent.prototype) as AccountWishlistComponent;
    Object.assign(cmp as any, {
      selected: new Set(['p1', 'missing']),
      account: {
        wishlist: {
          items: jasmine.createSpy('items').and.returnValue([
            {
              id: 'p1',
              name: 'Mug',
              slug: 'mug',
              base_price: 10,
              sale_price: null,
              currency: 'RON',
              stock_quantity: 3,
              images: [{ url: 'u' }],
            },
          ]),
        },
      },
      cart: { addFromProduct: jasmine.createSpy('addFromProduct') },
      toast: { success: jasmine.createSpy('success') },
      translate: { instant: jasmine.createSpy('instant').and.returnValue('ok') },
    });
    cmp.addSelectedToCart();
    expect((cmp as any).cart.addFromProduct).toHaveBeenCalledTimes(1);
    expect((cmp as any).toast.success).toHaveBeenCalledWith('ok');
  });
});
