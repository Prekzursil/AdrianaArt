import { ShopComponent } from './shop.component';

/** Golden WU shop-setsubcategory — setSubcategory allow/deny. */
describe('ShopComponent setSubcategory (golden WU)', () => {
  function createCmp(overrides: Record<string, unknown> = {}) {
    const cmp = Object.create(ShopComponent.prototype) as ShopComponent;
    const parent = { id: 'p1', slug: 'cameras', name: 'Cameras' };
    Object.assign(cmp as any, {
      cancelFilterDebounce: jasmine.createSpy('cancelFilterDebounce'),
      loadProducts: jasmine.createSpy('loadProducts'),
      activeCategorySlug: 'cameras',
      categoriesBySlug: new Map([['cameras', parent]]),
      getSubcategories: jasmine
        .createSpy('getSubcategories')
        .and.returnValue([{ slug: 'dslr' }, { slug: 'mirrorless' }]),
      filters: { page: 4 },
      activeSubcategorySlug: 'dslr',
      ...overrides,
    });
    return cmp;
  }

  it('no-ops without parent category', () => {
    const cmp = createCmp({ categoriesBySlug: new Map() });
    cmp.setSubcategory('dslr');
    expect((cmp as any).loadProducts).not.toHaveBeenCalled();
  });

  it('rejects disallowed subcategory slug', () => {
    const cmp = createCmp();
    cmp.setSubcategory('nope');
    expect((cmp as any).loadProducts).not.toHaveBeenCalled();
  });

  it('clears or sets allowed subcategory and reloads', () => {
    const cmp = createCmp();
    cmp.setSubcategory('');
    expect((cmp as any).cancelFilterDebounce).toHaveBeenCalled();
    expect((cmp as any).filters.page).toBe(1);
    expect((cmp as any).activeSubcategorySlug).toBe('');
    expect((cmp as any).loadProducts).toHaveBeenCalled();

    const ok = createCmp();
    ok.setSubcategory('mirrorless');
    expect((ok as any).activeSubcategorySlug).toBe('mirrorless');
    expect((ok as any).loadProducts).toHaveBeenCalled();
  });
});
