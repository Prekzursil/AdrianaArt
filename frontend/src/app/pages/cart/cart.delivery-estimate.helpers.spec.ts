import { CartComponent } from './cart.component';

describe('CartComponent deliveryEstimate helpers (golden WU)', () => {
  it('deliveryEstimate / Key / Params for sameday+home and fan_courier+locker', () => {
    const cmp = Object.create(CartComponent.prototype) as CartComponent;
    (cmp as any).courier = 'sameday';
    (cmp as any).deliveryType = 'home';
    expect(cmp.deliveryEstimate()).toEqual({ min: 1, max: 2 });
    expect(cmp.deliveryEstimateKey()).toBe('cart.deliveryEstimateRange');
    expect(cmp.deliveryEstimateParams()).toEqual({ min: 1, max: 2 });

    (cmp as any).courier = 'fan_courier';
    (cmp as any).deliveryType = 'locker';
    expect(cmp.deliveryEstimate()).toEqual({ min: 2, max: 4 });

    (cmp as any).courier = 'unknown';
    expect(cmp.deliveryEstimate()).toBeNull();
    expect(cmp.deliveryEstimateKey()).toBeNull();
    expect(cmp.deliveryEstimateParams()).toEqual({});
  });
});
