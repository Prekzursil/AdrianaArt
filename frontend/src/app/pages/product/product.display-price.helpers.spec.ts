import { ProductComponent } from './product.component';

describe('ProductComponent displayPrice (golden WU)', () => {
  function createCmp() {
    return Object.create(ProductComponent.prototype) as ProductComponent;
  }

  it('prefers sale_price when on sale, otherwise base_price', () => {
    const cmp = createCmp();
    expect(cmp.displayPrice({ base_price: 20, sale_price: 12 } as any)).toBe(12);
    expect(cmp.displayPrice({ base_price: 20, sale_price: 25 } as any)).toBe(20);
    expect(cmp.displayPrice({ base_price: 18 } as any)).toBe(18);
  });
});
