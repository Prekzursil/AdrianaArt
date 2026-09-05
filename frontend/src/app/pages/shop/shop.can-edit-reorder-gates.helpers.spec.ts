import { ShopComponent } from './shop.component';

/** Golden WU shop-can-edit-reorder-gates — admin + reorder gate helpers. */
describe('ShopComponent canEdit/canReorder helpers (golden WU)', () => {
  function createCmp(): ShopComponent {
    const cmp = Object.create(ShopComponent.prototype) as ShopComponent;
    (cmp as any).storefrontAdminMode = { enabled: jasmine.createSpy('enabled').and.returnValue(true) };
    (cmp as any).bulkSelectMode = jasmine.createSpy('bulkSelectMode').and.returnValue(false);
    (cmp as any).productReorderSaving = jasmine.createSpy('productReorderSaving').and.returnValue(false);
    (cmp as any).loading = jasmine.createSpy('loading').and.returnValue(false);
    (cmp as any).hasError = jasmine.createSpy('hasError').and.returnValue(false);
    (cmp as any).filters = { sort: 'recommended' };
    (cmp as any).activeCategorySlug = 'prints';
    (cmp as any).activeSubcategorySlug = '';
    (cmp as any).categoriesBySlug = new Map([
      ['prints', { id: 'p1', slug: 'prints', name: 'Prints' }],
    ]);
    (cmp as any).getSubcategories = jasmine.createSpy('getSubcategories').and.returnValue([]);
    (cmp as any).pageMeta = { total_pages: 1, page: 1, total_items: 3 };
    (cmp as any).paginationMode = 'pages';
    (cmp as any).products = [{ id: 'a' }, { id: 'b' }];
    return cmp;
  }

  it('canEditCategories/canEditProducts mirror storefrontAdminMode.enabled', () => {
    const cmp = createCmp();
    expect(cmp.canEditCategories()).toBe(true);
    expect(cmp.canEditProducts()).toBe(true);
    (cmp as any).storefrontAdminMode.enabled.and.returnValue(false);
    expect(cmp.canEditCategories()).toBe(false);
    expect(cmp.canEditProducts()).toBe(false);
  });

  it('activeLeafCategorySlug returns null for sale/parent-with-children and leaf otherwise', () => {
    const cmp = createCmp();
    (cmp as any).activeCategorySlug = 'sale';
    expect((cmp as any).activeLeafCategorySlug()).toBeNull();
    (cmp as any).activeCategorySlug = 'prints';
    (cmp as any).activeSubcategorySlug = 'kids';
    expect((cmp as any).activeLeafCategorySlug()).toBe('kids');
    (cmp as any).activeSubcategorySlug = '';
    (cmp as any).getSubcategories.and.returnValue([{ slug: 'kids' }]);
    expect((cmp as any).activeLeafCategorySlug()).toBeNull();
    (cmp as any).getSubcategories.and.returnValue([]);
    expect((cmp as any).activeLeafCategorySlug()).toBe('prints');
  });

  it('canReorderProducts requires admin, recommended sort, leaf, fully loaded page, >1 products', () => {
    const cmp = createCmp();
    expect(cmp.canReorderProducts()).toBe(true);
    (cmp as any).filters.sort = 'newest';
    expect(cmp.canReorderProducts()).toBe(false);
    (cmp as any).filters.sort = 'recommended';
    (cmp as any).products = [{ id: 'a' }];
    expect(cmp.canReorderProducts()).toBe(false);
    (cmp as any).products = [{ id: 'a' }, { id: 'b' }];
    (cmp as any).pageMeta = { total_pages: 2, page: 1, total_items: 10 };
    expect(cmp.canReorderProducts()).toBe(false);
  });
});
