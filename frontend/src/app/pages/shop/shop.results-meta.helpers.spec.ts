import { ShopComponent } from './shop.component';

describe('ShopComponent resultsMetaParams (golden WU)', () => {
  function createCmp(overrides: Record<string, unknown> = {}) {
    const cmp = Object.create(ShopComponent.prototype) as ShopComponent;
    Object.assign(cmp as any, {
      pageMeta: { total_items: 25, page: 2, limit: 10 },
      filters: { limit: 10 },
      paginationMode: 'pages',
      products: new Array(10).fill({ id: 'x' }),
      ...overrides,
    });
    return cmp;
  }

  it('returns null without meta or non-finite values', () => {
    expect(createCmp({ pageMeta: null }).resultsMetaParams()).toBeNull();
    expect(
      createCmp({ pageMeta: { total_items: Number.NaN, page: 1, limit: 10 } }).resultsMetaParams(),
    ).toBeNull();
  });

  it('zero-total and pages window', () => {
    expect(
      createCmp({ pageMeta: { total_items: 0, page: 1, limit: 10 } }).resultsMetaParams(),
    ).toEqual({
      total: 0,
      from: 0,
      to: 0,
    });
    expect(createCmp().resultsMetaParams()).toEqual({ total: 25, from: 11, to: 20 });
  });

  it('load_more uses shown products length', () => {
    const cmp = createCmp({
      paginationMode: 'load_more',
      products: new Array(7).fill({ id: 'p' }),
      pageMeta: { total_items: 25, page: 1, limit: 10 },
    });
    expect(cmp.resultsMetaParams()).toEqual({ total: 25, from: 1, to: 7 });
  });
});
