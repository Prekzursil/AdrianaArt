import { CartComponent } from './cart.component';

/** Golden WU cart-save-for-later -- saveForLater. */
describe('CartComponent saveForLater (golden WU)', () => {
  it('returns early when item id is missing', () => {
    const cmp = Object.create(CartComponent.prototype) as CartComponent;
    Object.assign(cmp as any, {
      savingForLater: {},
      cart: { remove: jasmine.createSpy('remove') },
    });
    cmp.saveForLater({ id: '', product_id: 'p1' } as any);
    expect((cmp as any).cart.remove).not.toHaveBeenCalled();
  });
});
