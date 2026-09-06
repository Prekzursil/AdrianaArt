import { ShopComponent } from './shop.component';

/** Golden WU shop-on-product-drag-end -- onProductDragEnd. */
describe('ShopComponent onProductDragEnd (golden WU)', () => {
  it('clears dragging and drag-over product ids', () => {
    const cmp = Object.create(ShopComponent.prototype) as ShopComponent;
    Object.assign(cmp as any, {
      draggingProductId: 'p1',
      dragOverProductId: 'p2',
    });
    cmp.onProductDragEnd();
    expect((cmp as any).draggingProductId).toBeNull();
    expect((cmp as any).dragOverProductId).toBeNull();
  });
});
