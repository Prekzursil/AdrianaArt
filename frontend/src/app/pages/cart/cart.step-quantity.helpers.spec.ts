import { CartComponent } from './cart.component';

describe('CartComponent stepQuantity (golden WU)', () => {
  it('forwards id and next quantity to onQuantityChange', () => {
    const cmp = Object.create(CartComponent.prototype) as any;
    const calls: any[] = [];
    cmp.onQuantityChange = (id: string, qty: number) => calls.push([id, qty]);
    cmp.stepQuantity({ id: 'sku-1', quantity: 2 }, 1);
    cmp.stepQuantity({ id: 'sku-1', quantity: 2 }, -1);
    expect(calls).toEqual([['sku-1', 3], ['sku-1', 1]]);
  });
});
