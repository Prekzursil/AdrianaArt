import { ShopComponent } from './shop.component';

/** Golden WU shop-resolve-label-canonical — label + canonical subcategory helpers. */
describe('ShopComponent resolve label/canonical helpers (golden WU)', () => {
  function createCmp(): ShopComponent {
    const cmp = Object.create(ShopComponent.prototype) as ShopComponent;
    (cmp as any).translate = { instant: jasmine.createSpy('instant').and.returnValue('Sale!') };
    (cmp as any).categoriesBySlug = new Map([
      ['prints', { id: 'p1', slug: 'prints', name: 'Prints', parent_id: null }],
      ['kids', { id: 'c1', slug: 'kids', name: 'Kids', parent_id: 'p1' }],
      ['orphan', { id: 'o1', slug: 'orphan', name: 'Orphan', parent_id: 'x' }],
    ]);
    (cmp as any).activeCategorySlug = '';
    (cmp as any).activeSubcategorySlug = '';
    return cmp;
  }

  it('resolveActiveCategoryLabel handles empty, sale, named, and slug fallback', () => {
    const cmp = createCmp();
    expect((cmp as any).resolveActiveCategoryLabel()).toBeNull();
    (cmp as any).activeCategorySlug = 'sale';
    expect((cmp as any).resolveActiveCategoryLabel()).toBe('Sale!');
    (cmp as any).activeCategorySlug = 'prints';
    expect((cmp as any).resolveActiveCategoryLabel()).toBe('Prints');
    (cmp as any).activeCategorySlug = 'new_arrivals';
    expect((cmp as any).resolveActiveCategoryLabel()).toBe('New Arrivals');
  });

  it('shouldKeepSubcategoryInCanonical rejects sale/missing and accepts valid child', () => {
    const cmp = createCmp();
    (cmp as any).activeCategorySlug = 'sale';
    (cmp as any).activeSubcategorySlug = 'kids';
    expect((cmp as any).shouldKeepSubcategoryInCanonical()).toBe(false);
    (cmp as any).activeCategorySlug = 'prints';
    (cmp as any).activeSubcategorySlug = '';
    expect((cmp as any).shouldKeepSubcategoryInCanonical()).toBe(false);
    (cmp as any).activeSubcategorySlug = 'orphan';
    expect((cmp as any).shouldKeepSubcategoryInCanonical()).toBe(false);
    (cmp as any).activeSubcategorySlug = 'kids';
    expect((cmp as any).shouldKeepSubcategoryInCanonical()).toBe(true);
  });

  it('shouldKeepSubcategoryInCanonical rejects unknown parent/child slugs', () => {
    const cmp = createCmp();
    (cmp as any).activeCategorySlug = 'missing';
    (cmp as any).activeSubcategorySlug = 'kids';
    expect((cmp as any).shouldKeepSubcategoryInCanonical()).toBe(false);
  });
});
