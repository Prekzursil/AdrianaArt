import { ShopComponent } from './shop.component';

/** Golden WU shop-results-meta-params — resultsMetaParams arms (#733 sidecar). */
describe('ShopComponent resultsMetaParams helpers (golden WU)', () => {
  function createCmp(overrides: Record<string, unknown> = {}): ShopComponent {
    const cmp = Object.create(ShopComponent.prototype) as ShopComponent;
    (cmp as any).pageMeta = null;
    (cmp as any).filters = { limit: 12 };
    (cmp as any).paginationMode = 'pages';
    (cmp as any).products = [];
    Object.assign(cmp as any, overrides);
    return cmp;
  }

  it('returns null when meta missing or non-finite/invalid limit', () => {
    expect(createCmp().resultsMetaParams()).toBeNull();
    expect(
      createCmp({ pageMeta: { total_items: Number.NaN, page: 1, limit: 12 } }).resultsMetaParams(),
    ).toBeNull();
    expect(
      createCmp({ pageMeta: { total_items: 10, page: 1, limit: 0 } }).resultsMetaParams(),
    ).toBeNull();
  });

  it('returns zero window when total is empty', () => {
    expect(
      createCmp({ pageMeta: { total_items: 0, page: 1, limit: 12 } }).resultsMetaParams(),
    ).toEqual({ total: 0, from: 0, to: 0 });
  });

  it('covers load_more shown window and paged from/to range', () => {
    expect(
      createCmp({
        paginationMode: 'load_more',
        products: [],
        pageMeta: { total_items: 40, page: 2, limit: 12 },
      }).resultsMetaParams(),
    ).toEqual({ total: 40, from: 0, to: 0 });

    expect(
      createCmp({
        paginationMode: 'load_more',
        products: [{}, {}, {}],
        pageMeta: { total_items: 40, page: 2, limit: 12 },
      }).resultsMetaParams(),
    ).toEqual({ total: 40, from: 1, to: 3 });

    expect(
      createCmp({
        paginationMode: 'pages',
        pageMeta: { total_items: 40, page: 2, limit: 12 },
      }).resultsMetaParams(),
    ).toEqual({ total: 40, from: 13, to: 24 });
  });
});
