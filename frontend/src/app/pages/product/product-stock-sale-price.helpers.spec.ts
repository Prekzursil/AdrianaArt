import { ProductComponent } from './product.component';
import type { Product } from '../../core/catalog.service';

describe('ProductComponent stock/sale/price helpers (golden WU)', () => {
  function createCmp(overrides: Record<string, unknown> = {}): ProductComponent {
    const cmp = Object.create(ProductComponent.prototype) as ProductComponent;
    (cmp as any).product = null;
    (cmp as any).selectedVariantId = null;
    Object.assign(cmp, overrides);
    return cmp;
  }

  function product(overrides: Partial<Product> = {}): Product {
    return {
      id: 'p1',
      base_price: 100,
      sale_price: null,
      stock_quantity: 5,
      allow_backorder: false,
      variants: [],
      ...overrides,
    } as Product;
  }

  it('isOutOfStock handles missing product, stock, variants, and backorder', () => {
    expect(createCmp({ product: null }).isOutOfStock()).toBeFalse();

    expect(
      createCmp({ product: product({ stock_quantity: 0, allow_backorder: false }) }).isOutOfStock(),
    ).toBeTrue();
    expect(
      createCmp({ product: product({ stock_quantity: 0, allow_backorder: true }) }).isOutOfStock(),
    ).toBeFalse();
    expect(
      createCmp({ product: product({ stock_quantity: 2, allow_backorder: false }) }).isOutOfStock(),
    ).toBeFalse();

    const withVariant = product({
      stock_quantity: 99,
      variants: [{ id: 'v1', stock_quantity: 0 } as any],
    });
    expect(createCmp({ product: withVariant, selectedVariantId: 'v1' }).isOutOfStock()).toBeTrue();
    // variant present but stock_quantity null => not out of stock
    const nullStockVariant = product({
      variants: [{ id: 'v2', stock_quantity: null } as any],
    });
    expect(
      createCmp({ product: nullStockVariant, selectedVariantId: 'v2' }).isOutOfStock(),
    ).toBeFalse();
  });

  it('isOnSale requires finite sale_price below base_price', () => {
    const cmp = createCmp();
    expect(cmp.isOnSale(product({ sale_price: null }))).toBeFalse();
    expect(cmp.isOnSale(product({ sale_price: 80 }))).toBeTrue();
    expect(cmp.isOnSale(product({ sale_price: 120 }))).toBeFalse();
    expect(cmp.isOnSale(product({ sale_price: Number.NaN }))).toBeFalse();
  });

  it('displayPrice prefers sale when on sale else base_price', () => {
    const cmp = createCmp();
    expect(cmp.displayPrice(product({ base_price: 100, sale_price: 80 }))).toBe(80);
    expect(cmp.displayPrice(product({ base_price: 100, sale_price: null }))).toBe(100);
    expect(cmp.displayPrice(product({ base_price: 100, sale_price: 150 }))).toBe(100);
  });
});
