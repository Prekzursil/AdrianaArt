import { CartComponent } from './cart.component';

describe('CartComponent displayProductPrice (golden WU)', () => {
  const cmp = Object.create(CartComponent.prototype) as CartComponent;

  it('prefers finite sale_price when lower than base_price', () => {
    expect(cmp.displayProductPrice({ base_price: 100, sale_price: 80 } as any)).toBe(80);
    expect(cmp.displayProductPrice({ base_price: 100, sale_price: 120 } as any)).toBe(100);
    expect(cmp.displayProductPrice({ base_price: 100, sale_price: Number.NaN } as any)).toBe(100);
    expect(cmp.displayProductPrice({ base_price: 55, sale_price: null } as any)).toBe(55);
    expect(cmp.displayProductPrice({ base_price: undefined } as any)).toBe(0);
  });
});
