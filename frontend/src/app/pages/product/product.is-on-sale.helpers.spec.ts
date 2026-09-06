import { ProductComponent } from './product.component';

describe('ProductComponent isOnSale (golden WU)', () => {
  function createCmp() {
    return Object.create(ProductComponent.prototype) as ProductComponent;
  }

  it('requires a finite sale_price strictly below base_price', () => {
    const cmp = createCmp();
    expect(cmp.isOnSale({ base_price: 20, sale_price: 15 } as any)).toBe(true);
    expect(cmp.isOnSale({ base_price: 20, sale_price: 20 } as any)).toBe(false);
    expect(cmp.isOnSale({ base_price: 20, sale_price: '15' } as any)).toBe(false);
    expect(cmp.isOnSale({ base_price: 20, sale_price: Number.NaN } as any)).toBe(false);
    expect(cmp.isOnSale({ base_price: 20 } as any)).toBe(false);
  });
});
