import { CheckoutComponent } from './checkout.component';

/** Golden WU checkout-courier-estimate-params — courierEstimateParams. */
describe('CheckoutComponent courierEstimateParams (golden WU)', () => {
  it('maps estimate to days or min/max params', () => {
    const cmp = Object.create(CheckoutComponent.prototype) as CheckoutComponent;
    (cmp as any).courierEstimate = () => null;
    expect(cmp.courierEstimateParams('sameday' as any)).toEqual({});
    (cmp as any).courierEstimate = () => ({ min: 2, max: 2 });
    expect(cmp.courierEstimateParams('sameday' as any)).toEqual({ days: 2 });
    (cmp as any).courierEstimate = () => ({ min: 1, max: 4 });
    expect(cmp.courierEstimateParams('fan_courier' as any)).toEqual({ min: 1, max: 4 });
  });
});
