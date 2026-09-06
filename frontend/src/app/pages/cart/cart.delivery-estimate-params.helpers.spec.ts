import { CartComponent } from './cart.component';

/** Golden WU cart-delivery-estimate-params — deliveryEstimateParams. */
describe('CartComponent deliveryEstimateParams (golden WU)', () => {
  it('maps deliveryEstimate to days or min/max', () => {
    const cmp = Object.create(CartComponent.prototype) as CartComponent;
    (cmp as any).deliveryEstimate = () => null;
    expect(cmp.deliveryEstimateParams()).toEqual({});
    (cmp as any).deliveryEstimate = () => ({ min: 3, max: 3 });
    expect(cmp.deliveryEstimateParams()).toEqual({ days: 3 });
    (cmp as any).deliveryEstimate = () => ({ min: 1, max: 5 });
    expect(cmp.deliveryEstimateParams()).toEqual({ min: 1, max: 5 });
  });
});
