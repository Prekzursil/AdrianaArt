import { ProductCardComponent } from './product-card.component';

/** Golden WU product-card-is-out-of-stock — isOutOfStock. */
describe('ProductCardComponent isOutOfStock (golden WU)', () => {
  it('treats zero stock without backorder as out of stock', () => {
    const cmp = Object.create(ProductCardComponent.prototype) as ProductCardComponent;
    Object.assign(cmp as any, { product: null });
    expect(cmp.isOutOfStock()).toBe(false);
    Object.assign(cmp as any, { product: { stock_quantity: 0, allow_backorder: false, variants: [] } });
    expect(cmp.isOutOfStock()).toBe(true);
    Object.assign(cmp as any, { product: { stock_quantity: 0, allow_backorder: true, variants: [] } });
    expect(cmp.isOutOfStock()).toBe(false);
    Object.assign(cmp as any, {
      product: { stock_quantity: 5, allow_backorder: false, variants: [{ stock_quantity: null }] },
    });
    expect(cmp.isOutOfStock()).toBe(false);
  });
});
