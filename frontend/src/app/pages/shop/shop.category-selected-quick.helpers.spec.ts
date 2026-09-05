import { ShopComponent } from './shop.component';

/** Golden WU shop-category-selected-quick — onCategorySelected/quickSelectCategory. */
describe('ShopComponent category selection helpers (golden WU)', () => {
  function createCmp(): ShopComponent {
    const cmp = Object.create(ShopComponent.prototype) as ShopComponent;
    (cmp as any).cancelFilterDebounce = jasmine.createSpy('cancelFilterDebounce');
    (cmp as any).loadProducts = jasmine.createSpy('loadProducts');
    (cmp as any).filters = { page: 4 };
    (cmp as any).categorySelection = 'prints';
    (cmp as any).activeCategorySlug = 'sale';
    (cmp as any).activeSubcategorySlug = 'kids';
    return cmp;
  }

  it('onCategorySelected cancels debounce, resets page/subcategory, loads', () => {
    const cmp = createCmp();
    cmp.onCategorySelected();
    expect((cmp as any).cancelFilterDebounce).toHaveBeenCalled();
    expect((cmp as any).filters.page).toBe(1);
    expect((cmp as any).activeCategorySlug).toBe('prints');
    expect((cmp as any).activeSubcategorySlug).toBe('');
    expect((cmp as any).loadProducts).toHaveBeenCalled();
  });

  it('onCategorySelected clears category when selection empty', () => {
    const cmp = createCmp();
    (cmp as any).categorySelection = '';
    cmp.onCategorySelected();
    expect((cmp as any).activeCategorySlug).toBe('');
  });

  it('quickSelectCategory sets selection, calls onCategorySelected, scrolls', () => {
    const cmp = createCmp();
    (cmp as any).onCategorySelected = jasmine.createSpy('onCategorySelected');
    const scrollTo = spyOn(window, 'scrollTo');
    cmp.quickSelectCategory('sale');
    expect((cmp as any).categorySelection).toBe('sale');
    expect((cmp as any).onCategorySelected).toHaveBeenCalled();
    expect(scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
  });
});
