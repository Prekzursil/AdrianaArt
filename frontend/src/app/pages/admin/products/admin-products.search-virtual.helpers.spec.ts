import { AdminProductsComponent } from './admin-products.component';

/** Golden WU products-search-virtual-helpers. */
describe('AdminProductsComponent search/virtual helpers (golden WU)', () => {
  function bare(overrides: Record<string, unknown> = {}): AdminProductsComponent {
    const cmp = Object.create(AdminProductsComponent.prototype) as AdminProductsComponent;
    Object.assign(cmp as any, {
      productSearchOpen: () => false,
      productSearchActiveIndex: () => -1,
      productSearchResults: () => [],
      inlineEditId: null,
      products: () => [],
      ...overrides,
    });
    return cmp;
  }

  it('productSearchActiveDescendant null unless open with valid index', () => {
    expect(bare().productSearchActiveDescendant()).toBeNull();
    expect(
      bare({
        productSearchOpen: () => true,
        productSearchActiveIndex: () => 1,
        productSearchResults: () => [{ id: 'a' }, { id: 'b' }],
      }).productSearchActiveDescendant(),
    ).toBe('admin-products-search-option-1');
    expect(
      bare({
        productSearchOpen: () => true,
        productSearchActiveIndex: () => 9,
        productSearchResults: () => [{ id: 'a' }],
      }).productSearchActiveDescendant(),
    ).toBeNull();
  });

  it('useVirtualProductsTable only when not editing and length>100', () => {
    expect(bare().useVirtualProductsTable()).toBe(false);
    const many = Array.from({ length: 101 }, (_, i) => ({ id: String(i) }));
    expect(bare({ products: () => many }).useVirtualProductsTable()).toBe(true);
    expect(bare({ products: () => many, inlineEditId: 'x' }).useVirtualProductsTable()).toBe(false);
    expect(bare().trackProductId(0, { id: 'p9' } as any)).toBe('p9');
  });
});
