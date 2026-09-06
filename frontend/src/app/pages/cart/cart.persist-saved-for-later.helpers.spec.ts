import { CartComponent } from './cart.component';

/** Golden WU cart-persist-saved-for-later -- persistSavedForLater. */
describe('CartComponent persistSavedForLater (golden WU)', () => {
  it('writes saved-for-later JSON to localStorage', () => {
    const cmp = Object.create(CartComponent.prototype) as CartComponent;
    const items = [{ product_id: 'p1', variant_id: null, quantity: 1 }] as any;
    Object.assign(cmp as any, { savedForLater: items });
    const setItem = spyOn(localStorage, 'setItem');
    (cmp as any).persistSavedForLater();
    expect(setItem).toHaveBeenCalledWith(
      'cart_saved_for_later',
      JSON.stringify(items),
    );
  });
});
