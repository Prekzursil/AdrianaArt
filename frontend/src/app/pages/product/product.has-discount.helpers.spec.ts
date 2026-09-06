import { ProductComponent } from './product.component';

/** Golden WU product-has-discount — isOnSale. */
describe('ProductComponent isOnSale (golden WU)', () => {
  it('requires finite sale price below base', () => {
    const cmp = Object.create(ProductComponent.prototype) as ProductComponent;
    expect(cmp.isOnSale({ base_price: 10, sale_price: 8 } as any)).toBe(true);
    expect(cmp.isOnSale({ base_price: 10, sale_price: 10 } as any)).toBe(false);
    expect(cmp.isOnSale({ base_price: 10, sale_price: null } as any)).toBe(false);
    expect(cmp.isOnSale({ base_price: 10, sale_price: Number.NaN } as any)).toBe(false);
  });
});
