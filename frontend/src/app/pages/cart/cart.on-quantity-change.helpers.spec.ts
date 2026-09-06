import { CartComponent } from './cart.component';

/** Golden WU cart-on-quantity-change -- onQuantityChange. */
describe('CartComponent onQuantityChange (golden WU)', () => {
  it('returns early when quantity is not finite', () => {
    const cmp = Object.create(CartComponent.prototype) as CartComponent;
    Object.assign(cmp as any, {
      items: jasmine.createSpy('items').and.returnValue([{ id: 'c1', stock: 5 }]),
      cart: { updateQuantity: jasmine.createSpy('update') },
      itemErrors: {},
    });
    cmp.onQuantityChange('c1', 'abc');
    expect((cmp as any).cart.updateQuantity).not.toHaveBeenCalled();
  });
});
