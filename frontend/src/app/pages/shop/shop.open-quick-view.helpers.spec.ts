import { ShopComponent } from './shop.component';

/** Golden WU shop-open-quick-view -- openQuickView. */
describe('ShopComponent openQuickView (golden WU)', () => {
  it('returns early when slug is blank', () => {
    const cmp = Object.create(ShopComponent.prototype) as ShopComponent;
    Object.assign(cmp as any, {
      quickViewSlug: '',
      quickViewOpen: false,
    });
    cmp.openQuickView('  ');
    expect((cmp as any).quickViewOpen).toBe(false);
    expect((cmp as any).quickViewSlug).toBe('');
  });
});
