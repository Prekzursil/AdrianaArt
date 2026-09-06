import { ProductComponent } from './product.component';

/** Golden WU product-price-to-show — displayPrice. */
describe('ProductComponent displayPrice (golden WU)', () => {
  it('returns sale when on sale else base', () => {
    const cmp = Object.create(ProductComponent.prototype) as ProductComponent;
    expect(cmp.displayPrice({ base_price: 10, sale_price: 7 } as any)).toBe(7);
    expect(cmp.displayPrice({ base_price: 10, sale_price: null } as any)).toBe(10);
  });
});
