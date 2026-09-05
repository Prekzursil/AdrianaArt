import { ShopComponent } from './shop.component';

/** Golden WU shop-quick-select-category — quickSelectCategory arms (#716 sidecar). */
describe('ShopComponent quickSelectCategory helpers (golden WU)', () => {
  function createCmp(): ShopComponent {
    const cmp = Object.create(ShopComponent.prototype) as ShopComponent;
    (cmp as any).categorySelection = '';
    (cmp as any).onCategorySelected = jasmine.createSpy('onCategorySelected');
    return cmp;
  }

  it('sets categorySelection (stringified) and invokes onCategorySelected', () => {
    const cmp = createCmp();
    const scrollTo = jasmine.createSpy('scrollTo');
    (window as any).scrollTo = scrollTo;
    cmp.quickSelectCategory('  mugs  ');
    expect((cmp as any).categorySelection).toBe('  mugs  ');
    expect((cmp as any).onCategorySelected).toHaveBeenCalled();
    expect(scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
  });

  it('stringifies nullish slug to empty selection', () => {
    const cmp = createCmp();
    (window as any).scrollTo = jasmine.createSpy('scrollTo');
    cmp.quickSelectCategory(null as any);
    expect((cmp as any).categorySelection).toBe('');
    expect((cmp as any).onCategorySelected).toHaveBeenCalled();
  });

  it('scrolls smoothly to top after selection in browser', () => {
    const cmp = createCmp();
    const scrollTo = jasmine.createSpy('scrollTo');
    (window as any).scrollTo = scrollTo;
    cmp.quickSelectCategory('sale');
    expect(scrollTo).toHaveBeenCalledOnceWith({ top: 0, behavior: 'smooth' });
  });
});
