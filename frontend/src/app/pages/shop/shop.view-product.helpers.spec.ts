import { ShopComponent } from './shop.component';

/** Golden WU shop-view-product — N=3 viewProduct arms (#736 sidecar). */
describe('ShopComponent viewProduct helpers (golden WU)', () => {
  function createCmp(): ShopComponent {
    const cmp = Object.create(ShopComponent.prototype) as ShopComponent;
    (cmp as any).quickViewOpen = true;
    (cmp as any).quickViewSlug = 'keep-me';
    (cmp as any).rememberShopReturnContext = jasmine.createSpy('rememberShopReturnContext');
    (cmp as any).router = { navigate: jasmine.createSpy('navigate').and.returnValue(Promise.resolve(true)) };
    return cmp;
  }

  it('viewProduct no-ops on empty/whitespace slug', () => {
    const cmp = createCmp();
    cmp.viewProduct('');
    cmp.viewProduct('   ');
    expect((cmp as any).rememberShopReturnContext).not.toHaveBeenCalled();
    expect((cmp as any).router.navigate).not.toHaveBeenCalled();
    expect((cmp as any).quickViewOpen).toBe(true);
  });

  it('viewProduct remembers return context and closes quick view', () => {
    const cmp = createCmp();
    cmp.viewProduct('ceramic-bowl');
    expect((cmp as any).rememberShopReturnContext).toHaveBeenCalled();
    expect((cmp as any).quickViewOpen).toBe(false);
    expect((cmp as any).quickViewSlug).toBe('');
  });

  it('viewProduct navigates to /products/:slug', () => {
    const cmp = createCmp();
    cmp.viewProduct('  ceramic-bowl  ');
    expect((cmp as any).router.navigate).toHaveBeenCalledWith(['/products', 'ceramic-bowl']);
  });
});
