import { ShopComponent } from './shop.component';

/** Golden WU shop-pagination-change-loadmore — mode/page/loadMore helpers. */
describe('ShopComponent pagination helpers (golden WU)', () => {
  function createCmp(): ShopComponent {
    const cmp = Object.create(ShopComponent.prototype) as ShopComponent;
    (cmp as any).cancelFilterDebounce = jasmine.createSpy('cancelFilterDebounce');
    (cmp as any).loadProducts = jasmine.createSpy('loadProducts');
    (cmp as any).fetchProducts = jasmine.createSpy('fetchProducts');
    (cmp as any).loadingMore = { set: jasmine.createSpy('loadingMore.set'), ...({} as any) };
    // callable signal-like
    const loadingMoreState = { value: false };
    (cmp as any).loadingMore = Object.assign(
      jasmine.createSpy('loadingMore').and.callFake(() => loadingMoreState.value),
      { set: jasmine.createSpy('set').and.callFake((v: boolean) => { loadingMoreState.value = v; }) },
    );
    (cmp as any).hasError = { set: jasmine.createSpy('hasError.set') };
    (cmp as any).paginationMode = 'pages';
    (cmp as any).filters = { page: 1 };
    (cmp as any).pageMeta = { page: 2, total_pages: 5 };
    return cmp;
  }

  it('setPaginationMode no-ops when unchanged and switches otherwise', () => {
    const cmp = createCmp();
    cmp.setPaginationMode('pages');
    expect((cmp as any).cancelFilterDebounce).not.toHaveBeenCalled();
    cmp.setPaginationMode('load_more');
    expect((cmp as any).cancelFilterDebounce).toHaveBeenCalled();
    expect((cmp as any).paginationMode).toBe('load_more');
    expect((cmp as any).filters.page).toBe(1);
    expect((cmp as any).loadProducts).toHaveBeenCalled();
  });

  it('changePage ignores non-pages mode and out-of-range deltas', () => {
    const cmp = createCmp();
    (cmp as any).paginationMode = 'load_more';
    cmp.changePage(1);
    expect((cmp as any).loadProducts).not.toHaveBeenCalled();
    (cmp as any).paginationMode = 'pages';
    (cmp as any).pageMeta = { page: 5, total_pages: 5 };
    cmp.changePage(1);
    expect((cmp as any).loadProducts).not.toHaveBeenCalled();
    (cmp as any).pageMeta = { page: 2, total_pages: 5 };
    cmp.changePage(-1);
    expect((cmp as any).filters.page).toBe(1);
    expect((cmp as any).loadProducts).toHaveBeenCalled();
  });

  it('loadMore advances page when in load_more mode with valid next page', () => {
    const cmp = createCmp();
    (cmp as any).paginationMode = 'pages';
    cmp.loadMore();
    expect((cmp as any).fetchProducts).not.toHaveBeenCalled();
    (cmp as any).paginationMode = 'load_more';
    (cmp as any).pageMeta = { page: 2, total_pages: 4 };
    cmp.loadMore();
    expect((cmp as any).filters.page).toBe(3);
    expect((cmp as any).loadingMore.set).toHaveBeenCalledWith(true);
    expect((cmp as any).hasError.set).toHaveBeenCalledWith(false);
    expect((cmp as any).fetchProducts).toHaveBeenCalledWith(true);
  });
});
