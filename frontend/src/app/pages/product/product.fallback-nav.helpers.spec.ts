import { ProductComponent } from './product.component';

/** Golden WU product-fallback-nav — N=3 backToShop / retryLoad / showFallbackNavigationLinks. */
describe('ProductComponent fallback-nav helpers (golden WU)', () => {
  function createCmp(): ProductComponent {
    const cmp = Object.create(ProductComponent.prototype) as ProductComponent;
    (cmp as any).router = {
      navigateByUrl: jasmine.createSpy('navigateByUrl'),
      navigate: jasmine.createSpy('navigate'),
    };
    (cmp as any).shopReturnUrl = null;
    (cmp as any).upsellProducts = [];
    (cmp as any).relatedProducts = [];
    (cmp as any).recentlyViewed = [];
    (cmp as any).load = jasmine.createSpy('load');
    return cmp;
  }

  it('backToShop prefers shopReturnUrl then falls back to /shop', () => {
    const cmp = createCmp();
    cmp.backToShop();
    expect((cmp as any).router.navigate).toHaveBeenCalledWith(['/shop']);

    (cmp as any).shopReturnUrl = '/shop?tag=mugs';
    cmp.backToShop();
    expect((cmp as any).router.navigateByUrl).toHaveBeenCalledWith('/shop?tag=mugs');
  });

  it('retryLoad delegates to load()', () => {
    const cmp = createCmp();
    cmp.retryLoad();
    expect((cmp as any).load).toHaveBeenCalled();
  });

  it('showFallbackNavigationLinks is true only when all product rails are empty', () => {
    const cmp = createCmp();
    expect(cmp.showFallbackNavigationLinks()).toBe(true);
    (cmp as any).upsellProducts = [{ id: '1' }];
    expect(cmp.showFallbackNavigationLinks()).toBe(false);
    (cmp as any).upsellProducts = [];
    (cmp as any).relatedProducts = [{ id: '2' }];
    expect(cmp.showFallbackNavigationLinks()).toBe(false);
    (cmp as any).relatedProducts = [];
    (cmp as any).recentlyViewed = [{ id: '3' }];
    expect(cmp.showFallbackNavigationLinks()).toBe(false);
    (cmp as any).recentlyViewed = [];
    expect(cmp.showFallbackNavigationLinks()).toBe(true);
  });
});
