import { AdminProductsComponent } from './admin-products.component';

/** Golden WU products-page-selection-helpers. */
describe('AdminProductsComponent page selection helpers (golden WU)', () => {
  function bare(
    ids: string[],
    selected: string[],
    view: string = 'active',
  ): AdminProductsComponent {
    const cmp = Object.create(AdminProductsComponent.prototype) as AdminProductsComponent;
    Object.assign(cmp as any, {
      view,
      products: () => ids.map((id) => ({ id })),
      selected: new Set(selected),
      bulkError: { set: jasmine.createSpy('bulkError.set') },
      bulkPricePreview: { x: 1 },
    });
    return cmp;
  }

  it('allSelectedOnPage false for deleted/empty/partial; true when every id selected', () => {
    expect(bare(['a'], ['a'], 'deleted').allSelectedOnPage()).toBe(false);
    expect(bare([], []).allSelectedOnPage()).toBe(false);
    expect(bare(['a', 'b'], ['a']).allSelectedOnPage()).toBe(false);
    expect(bare(['a', 'b'], ['a', 'b']).allSelectedOnPage()).toBe(true);
  });

  it('selectedProductsOnPage filters current page by selected set', () => {
    const cmp = bare(['a', 'b', 'c'], ['b', 'c']);
    expect(cmp.selectedProductsOnPage().map((p) => p.id)).toEqual(['b', 'c']);
  });

  it('clearSelection empties selection and clears bulk preview/error', () => {
    const cmp = bare(['a'], ['a']);
    cmp.clearSelection();
    expect((cmp as any).selected.size).toBe(0);
    expect((cmp as any).bulkPricePreview).toBeNull();
    expect((cmp as any).bulkError.set).toHaveBeenCalledWith(null);
  });
});
