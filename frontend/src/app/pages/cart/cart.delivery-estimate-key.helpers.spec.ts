import { CartComponent } from './cart.component';

describe('CartComponent deliveryEstimateKey (golden WU)', () => {
  it('returns single/range keys or null', () => {
    const cmp = Object.create(CartComponent.prototype) as any;
    cmp.deliveryEstimate = () => null;
    expect(cmp.deliveryEstimateKey()).toBeNull();
    cmp.deliveryEstimate = () => ({ min: 2, max: 2 });
    expect(cmp.deliveryEstimateKey()).toBe('cart.deliveryEstimateSingle');
    cmp.deliveryEstimate = () => ({ min: 2, max: 5 });
    expect(cmp.deliveryEstimateKey()).toBe('cart.deliveryEstimateRange');
  });
});
