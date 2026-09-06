import { CartComponent } from './cart.component';

/** Golden WU cart-is-low-stock-helpers. */
describe('CartComponent stock helpers (golden WU)', () => {
  function bare(): CartComponent {
    return Object.create(CartComponent.prototype) as CartComponent;
  }

  it('isLowStock / isMaxQuantity from stock and quantity', () => {
    const cmp = bare();
    expect(cmp.isLowStock({ stock: 0, quantity: 1 } as any)).toBe(false);
    expect(cmp.isLowStock({ stock: 3, quantity: 1 } as any)).toBe(true);
    expect(cmp.isLowStock({ stock: 4, quantity: 1 } as any)).toBe(false);
    expect(cmp.isMaxQuantity({ stock: 0, quantity: 1 } as any)).toBe(false);
    expect(cmp.isMaxQuantity({ stock: 2, quantity: 2 } as any)).toBe(true);
    expect(cmp.isMaxQuantity({ stock: 5, quantity: 2 } as any)).toBe(false);
  });
});
