import { CartComponent } from './cart.component';

/** Golden WU cart-move-saved-to-cart -- moveSavedToCart. */
describe('CartComponent moveSavedToCart (golden WU)', () => {
  it('returns early when restore already in flight', () => {
    const cmp = Object.create(CartComponent.prototype) as CartComponent;
    Object.assign(cmp as any, {
      saveKey: jasmine.createSpy('saveKey').and.returnValue('k1'),
      restoringSaved: { k1: true },
      cartApi: { addItem: jasmine.createSpy('addItem') },
    });
    cmp.moveSavedToCart({ product_id: 'p1', quantity: 1 } as any);
    expect((cmp as any).cartApi.addItem).not.toHaveBeenCalled();
  });
});
