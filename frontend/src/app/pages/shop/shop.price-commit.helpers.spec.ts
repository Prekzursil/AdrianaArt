import { ShopComponent } from './shop.component';

/** Golden WU shop-price-commit — onPriceTextChange / onPriceCommit helpers. */
describe('ShopComponent price text/commit helpers (golden WU)', () => {
  function createCmp(overrides: Record<string, unknown> = {}) {
    const cmp = Object.create(ShopComponent.prototype) as any;
    const parsePrice = jasmine.createSpy('parsePrice').and.callFake((raw: unknown) => {
      if (raw === null || raw === undefined) return undefined;
      if (typeof raw === 'number') return Number.isFinite(raw) ? raw : undefined;
      if (typeof raw !== 'string') return undefined;
      const str = String(raw).trim();
      if (!str) return undefined;
      const n = Number(str);
      return Number.isFinite(n) ? n : undefined;
    });
    const normalizePriceRange = jasmine.createSpy('normalizePriceRange');
    const scheduleFilterApply = jasmine.createSpy('scheduleFilterApply');
    const applyFilters = jasmine.createSpy('applyFilters');
    Object.defineProperty(ShopComponent.prototype, 'parsePrice', {
      configurable: true,
      value: parsePrice,
      writable: true,
    });
    Object.defineProperty(ShopComponent.prototype, 'normalizePriceRange', {
      configurable: true,
      value: normalizePriceRange,
      writable: true,
    });
    Object.defineProperty(ShopComponent.prototype, 'scheduleFilterApply', {
      configurable: true,
      value: scheduleFilterApply,
      writable: true,
    });
    Object.assign(cmp, {
      priceMinBound: 0,
      priceMaxBound: 1000,
      filters: { min_price: 0, max_price: 1000, page: 1 },
      applyFilters,
      ...overrides,
    });
    cmp._parsePrice = parsePrice;
    cmp._normalizePriceRange = normalizePriceRange;
    cmp._scheduleFilterApply = scheduleFilterApply;
    return cmp as ShopComponent;
  }

  afterEach(() => {
    for (const k of ['parsePrice', 'normalizePriceRange', 'scheduleFilterApply']) {
      Reflect.deleteProperty(ShopComponent.prototype as object, k);
    }
  });

  it('onPriceTextChange updates min/max, normalizes, and schedules apply', () => {
    const cmp = createCmp() as any;
    ShopComponent.prototype.onPriceTextChange.call(cmp, 'min', '10');
    expect(cmp.filters.min_price).toBe(10);
    expect(cmp._normalizePriceRange).toHaveBeenCalledWith('min');
    expect(cmp._scheduleFilterApply).toHaveBeenCalled();

    ShopComponent.prototype.onPriceTextChange.call(cmp, 'max', '99');
    expect(cmp.filters.max_price).toBe(99);
  });

  it('onPriceTextChange falls back to bounds when parse fails', () => {
    const cmp = createCmp() as any;
    ShopComponent.prototype.onPriceTextChange.call(cmp, 'min', 'nope');
    expect(cmp.filters.min_price).toBe(0);
    ShopComponent.prototype.onPriceTextChange.call(cmp, 'max', '');
    expect(cmp.filters.max_price).toBe(1000);
  });

  it('onPriceCommit normalizes then applyFilters', () => {
    const cmp = createCmp() as any;
    ShopComponent.prototype.onPriceCommit.call(cmp, 'max');
    expect(cmp._normalizePriceRange).toHaveBeenCalledWith('max');
    expect(cmp.applyFilters).toHaveBeenCalled();
  });
});
