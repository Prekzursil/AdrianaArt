import { CartComponent } from './cart.component';

describe('CartComponent isLowStock / isMaxQuantity (golden WU)', () => {
  const cmp = Object.create(CartComponent.prototype) as CartComponent;

  it('isLowStock when stock in (0, 3]', () => {
    expect(cmp.isLowStock({ stock: 0 } as any)).toBe(false);
    expect(cmp.isLowStock({ stock: 1 } as any)).toBe(true);
    expect(cmp.isLowStock({ stock: 3 } as any)).toBe(true);
    expect(cmp.isLowStock({ stock: 4 } as any)).toBe(false);
  });

  it('isMaxQuantity when stock > 0 and quantity >= stock', () => {
    expect(cmp.isMaxQuantity({ stock: 0, quantity: 5 } as any)).toBe(false);
    expect(cmp.isMaxQuantity({ stock: 2, quantity: 1 } as any)).toBe(false);
    expect(cmp.isMaxQuantity({ stock: 2, quantity: 2 } as any)).toBe(true);
    expect(cmp.isMaxQuantity({ stock: 2, quantity: 3 } as any)).toBe(true);
  });
});
