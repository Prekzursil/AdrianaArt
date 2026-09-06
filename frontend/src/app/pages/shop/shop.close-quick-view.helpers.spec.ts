import { ShopComponent } from './shop.component';

/** Golden WU shop-close-quick-view -- closeQuickView. */
describe('ShopComponent closeQuickView (golden WU)', () => {
  it('clears quick-view open flag and slug', () => {
    const cmp = Object.create(ShopComponent.prototype) as ShopComponent;
    Object.assign(cmp as any, {
      quickViewOpen: true,
      quickViewSlug: 'ring',
    });
    cmp.closeQuickView();
    expect((cmp as any).quickViewOpen).toBe(false);
    expect((cmp as any).quickViewSlug).toBe('');
  });
});
