import { ProductComponent } from './product.component';

/** Golden WU product-price-to-show — priceToShow. */
describe('ProductComponent priceToShow (golden WU)', () => {
  it('returns sale when on sale else base', () => {
    const cmp = Object.create(ProductComponent.prototype) as ProductComponent;
    (cmp as any).hasDiscount = (p: any) => typeof p.sale_price === 'number' && p.sale_price < p.base_price;
    expect(cmp.priceToShow({ base_price: 10, sale_price: 7 } as any)).toBe(7);
    expect(cmp.priceToShow({ base_price: 10, sale_price: null } as any)).toBe(10);
  });
});
