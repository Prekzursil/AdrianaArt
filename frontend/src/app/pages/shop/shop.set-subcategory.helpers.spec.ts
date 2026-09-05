import { ShopComponent } from './shop.component';
import type { Category } from '../../core/catalog.service';

/** Golden WU shop-set-subcategory — N=3 setSubcategory missing/deny/allow arms. */
describe('ShopComponent setSubcategory helpers (golden WU)', () => {
  function createCmp(): ShopComponent {
    const cmp = Object.create(ShopComponent.prototype) as ShopComponent;
    const prints = { id: 'p1', slug: 'prints', name: 'Prints', parent_id: null } as Category;
    const kids = { id: 'c1', slug: 'kids', name: 'Kids', parent_id: 'p1' } as Category;
    const adults = { id: 'c2', slug: 'adults', name: 'Adults', parent_id: 'p1' } as Category;
    (cmp as any).categoriesBySlug = new Map([
      ['prints', prints],
      ['kids', kids],
      ['adults', adults],
    ]);
    (cmp as any).getSubcategories = (parent: Category) =>
      parent.id === 'p1' ? [kids, adults] : [];
    (cmp as any).cancelFilterDebounce = jasmine.createSpy('cancelFilterDebounce');
    (cmp as any).loadProducts = jasmine.createSpy('loadProducts');
    (cmp as any).filters = { page: 1 };
    (cmp as any).activeCategorySlug = 'prints';
    (cmp as any).activeSubcategorySlug = '';
    return cmp;
  }

  it('setSubcategory is a no-op when active category is missing', () => {
    const cmp = createCmp();
    (cmp as any).activeCategorySlug = '';
    (cmp as any).activeSubcategorySlug = 'kids';
    (cmp as any).filters.page = 3;
    cmp.setSubcategory('kids');
    expect((cmp as any).cancelFilterDebounce).toHaveBeenCalled();
    expect((cmp as any).activeSubcategorySlug).toBe('kids');
    expect((cmp as any).filters.page).toBe(3);
    expect((cmp as any).loadProducts).not.toHaveBeenCalled();
  });

  it('setSubcategory rejects a slug that is not a child of the active category', () => {
    const cmp = createCmp();
    (cmp as any).activeSubcategorySlug = 'kids';
    (cmp as any).filters.page = 2;
    cmp.setSubcategory('sale');
    expect((cmp as any).activeSubcategorySlug).toBe('kids');
    expect((cmp as any).filters.page).toBe(2);
    expect((cmp as any).loadProducts).not.toHaveBeenCalled();
  });

  it('setSubcategory applies an allowed slug, resets page, and loads products', () => {
    const cmp = createCmp();
    (cmp as any).activeSubcategorySlug = 'adults';
    (cmp as any).filters.page = 4;
    cmp.setSubcategory('kids');
    expect((cmp as any).cancelFilterDebounce).toHaveBeenCalled();
    expect((cmp as any).activeSubcategorySlug).toBe('kids');
    expect((cmp as any).filters.page).toBe(1);
    expect((cmp as any).loadProducts).toHaveBeenCalled();
  });
});
