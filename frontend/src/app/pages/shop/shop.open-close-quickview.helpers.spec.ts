import { ShopComponent } from './shop.component';

/** Golden WU shop-open-close-quickview — N=3 openQuickView empty/trim + closeQuickView. */
describe('ShopComponent open/close quickview helpers (golden WU)', () => {
  function createCmp(): ShopComponent {
    const cmp = Object.create(ShopComponent.prototype) as ShopComponent;
    (cmp as any).quickViewSlug = '';
    (cmp as any).quickViewOpen = false;
    return cmp;
  }

  it('openQuickView is a no-op when slug is empty/whitespace', () => {
    const cmp = createCmp();
    cmp.quickViewSlug = 'keep';
    cmp.quickViewOpen = false;
    cmp.openQuickView('   ');
    expect(cmp.quickViewSlug).toBe('keep');
    expect(cmp.quickViewOpen).toBe(false);
    cmp.openQuickView('');
    expect(cmp.quickViewSlug).toBe('keep');
    expect(cmp.quickViewOpen).toBe(false);
  });

  it('openQuickView trims slug and opens the panel', () => {
    const cmp = createCmp();
    cmp.openQuickView('  featured-print  ');
    expect(cmp.quickViewSlug).toBe('featured-print');
    expect(cmp.quickViewOpen).toBe(true);
  });

  it('closeQuickView clears slug and closes the panel', () => {
    const cmp = createCmp();
    cmp.quickViewSlug = 'featured-print';
    cmp.quickViewOpen = true;
    cmp.closeQuickView();
    expect(cmp.quickViewSlug).toBe('');
    expect(cmp.quickViewOpen).toBe(false);
  });
});
