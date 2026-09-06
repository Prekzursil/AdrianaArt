import { CartComponent } from './cart.component';

describe('CartComponent isLowStock (golden WU)', () => {
  it('is true only for positive stock at or below 3', () => {
    const cmp = Object.create(CartComponent.prototype) as any;
    expect(cmp.isLowStock({ stock: 0, quantity: 1 })).toBe(false);
    expect(cmp.isLowStock({ stock: 3, quantity: 1 })).toBe(true);
    expect(cmp.isLowStock({ stock: 4, quantity: 1 })).toBe(false);
  });
});
