import { ShopComponent } from './shop.component';

/** Golden WU shop-price-text-commit — onPriceTextChange/onPriceCommit (#725 sidecar). */
describe('ShopComponent price text/commit helpers (golden WU)', () => {
  function createCmp(): ShopComponent {
    const cmp = Object.create(ShopComponent.prototype) as ShopComponent;
    (cmp as any).priceMinBound = 0;
    (cmp as any).priceMaxBound = 500;
    (cmp as any).filters = { min_price: 0, max_price: 500 };
    (cmp as any).parsePrice = jasmine.createSpy('parsePrice').and.callFake((raw: any) => {
      const n = Number(raw);
      return Number.isFinite(n) ? n : null;
    });
    (cmp as any).normalizePriceRange = jasmine.createSpy('normalizePriceRange');
    (cmp as any).scheduleFilterApply = jasmine.createSpy('scheduleFilterApply');
    (cmp as any).applyFilters = jasmine.createSpy('applyFilters');
    return cmp;
  }

  it('onPriceTextChange sets min from parsed value and schedules apply', () => {
    const cmp = createCmp();
    cmp.onPriceTextChange('min', '40');
    expect((cmp as any).filters.min_price).toBe(40);
    expect((cmp as any).normalizePriceRange).toHaveBeenCalledWith('min');
    expect((cmp as any).scheduleFilterApply).toHaveBeenCalled();
  });

  it('onPriceTextChange falls back to bound when parse fails for max', () => {
    const cmp = createCmp();
    cmp.onPriceTextChange('max', 'nope');
    expect((cmp as any).filters.max_price).toBe(500);
    expect((cmp as any).normalizePriceRange).toHaveBeenCalledWith('max');
  });

  it('onPriceCommit normalizes then applyFilters', () => {
    const cmp = createCmp();
    cmp.onPriceCommit('min');
    expect((cmp as any).normalizePriceRange).toHaveBeenCalledWith('min');
    expect((cmp as any).applyFilters).toHaveBeenCalled();
  });
});
