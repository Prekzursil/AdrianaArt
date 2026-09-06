import { CartComponent } from './cart.component';

describe('CartComponent isMaxQuantity (golden WU)', () => {
  it('is true when quantity reaches positive stock', () => {
    const cmp = Object.create(CartComponent.prototype) as any;
    expect(cmp.isMaxQuantity({ stock: 0, quantity: 5 })).toBe(false);
    expect(cmp.isMaxQuantity({ stock: 2, quantity: 2 })).toBe(true);
    expect(cmp.isMaxQuantity({ stock: 3, quantity: 2 })).toBe(false);
  });
});
