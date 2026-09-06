import { CartComponent } from './cart.component';

/** Golden WU cart-remove-saved-for-later -- removeSavedForLater. */
describe('CartComponent removeSavedForLater (golden WU)', () => {
  it('filters the matching save key and persists', () => {
    const cmp = Object.create(CartComponent.prototype) as CartComponent;
    const keep = { product_id: 'a', variant_id: null } as any;
    const drop = { product_id: 'b', variant_id: 'v1' } as any;
    Object.assign(cmp as any, {
      savedForLater: [keep, drop],
      restoringSaved: { 'b::v1': true },
      saveKey: (item: any) => `${item.product_id}::${item.variant_id || ''}`,
      persistSavedForLater: jasmine.createSpy('persist'),
    });
    cmp.removeSavedForLater(drop);
    expect((cmp as any).savedForLater).toEqual([keep]);
    expect((cmp as any).persistSavedForLater).toHaveBeenCalled();
    expect((cmp as any).restoringSaved['b::v1']).toBeUndefined();
  });
});
