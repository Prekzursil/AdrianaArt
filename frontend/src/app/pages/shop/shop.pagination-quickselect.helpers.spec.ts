import { ShopComponent } from './shop.component';

/** Golden WU shop-pagination-quickselect — setPaginationMode + quickSelectCategory. */
describe('ShopComponent pagination/quickSelect helpers (golden WU)', () => {
  function createCmp(overrides: Record<string, unknown> = {}) {
    const cmp = Object.create(ShopComponent.prototype) as ShopComponent;
    Object.assign(cmp as any, {
      paginationMode: 'pages',
      filters: { page: 4 },
      cancelFilterDebounce: jasmine.createSpy('cancelFilterDebounce'),
      loadProducts: jasmine.createSpy('loadProducts'),
      categorySelection: '',
      onCategorySelected: jasmine.createSpy('onCategorySelected'),
      ...overrides,
    });
    return cmp;
  }

  it('setPaginationMode no-ops when unchanged', () => {
    const cmp = createCmp();
    cmp.setPaginationMode('pages');
    expect((cmp as any).cancelFilterDebounce).not.toHaveBeenCalled();
  });

  it('setPaginationMode switches mode, resets page, loads', () => {
    const cmp = createCmp();
    cmp.setPaginationMode('load_more');
    expect((cmp as any).cancelFilterDebounce).toHaveBeenCalled();
    expect((cmp as any).paginationMode).toBe('load_more');
    expect((cmp as any).filters.page).toBe(1);
    expect((cmp as any).loadProducts).toHaveBeenCalled();
  });

  it('quickSelectCategory sets selection, notifies, and scrolls when window exists', () => {
    const cmp = createCmp();
    const scrollTo = spyOn(window, 'scrollTo');
    cmp.quickSelectCategory('cameras');
    expect((cmp as any).categorySelection).toBe('cameras');
    expect((cmp as any).onCategorySelected).toHaveBeenCalled();
    expect(scrollTo).toHaveBeenCalled();
  });
});
