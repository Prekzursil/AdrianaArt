import { ProductComponent } from './product.component';

describe('ProductComponent stock/sale/price helpers (golden WU)', () => {
  it('isOutOfStock respects variant stock and allow_backorder', () => {
    const cmp = Object.create(ProductComponent.prototype) as ProductComponent;
    (cmp as any).product = null;
    expect(cmp.isOutOfStock()).toBe(false);

    (cmp as any).selectedVariantId = null;
    (cmp as any).product = {
      stock_quantity: 0,
      allow_backorder: false,
      variants: [],
    };
    expect(cmp.isOutOfStock()).toBe(true);

    (cmp as any).product = {
      stock_quantity: 0,
      allow_backorder: true,
      variants: [],
    };
    expect(cmp.isOutOfStock()).toBe(false);

    (cmp as any).product = {
      stock_quantity: 5,
      allow_backorder: false,
      variants: [{ id: 'v1', stock_quantity: 0 }],
    };
    (cmp as any).selectedVariantId = 'v1';
    expect(cmp.isOutOfStock()).toBe(true);

    (cmp as any).product = {
      stock_quantity: 0,
      allow_backorder: false,
      variants: [{ id: 'v1', stock_quantity: null }],
    };
    expect(cmp.isOutOfStock()).toBe(false);
  });

  it('isOnSale and displayPrice prefer finite sale_price below base', () => {
    const cmp = Object.create(ProductComponent.prototype) as ProductComponent;
    const p = { base_price: 100, sale_price: 80 } as any;
    expect(cmp.isOnSale(p)).toBe(true);
    expect(cmp.displayPrice(p)).toBe(80);

    expect(cmp.isOnSale({ base_price: 100, sale_price: 120 } as any)).toBe(false);
    expect(cmp.displayPrice({ base_price: 100, sale_price: 120 } as any)).toBe(100);
    expect(cmp.isOnSale({ base_price: 100, sale_price: 'x' } as any)).toBe(false);
  });
});
