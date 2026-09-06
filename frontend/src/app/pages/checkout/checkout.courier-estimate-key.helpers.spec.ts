import { CheckoutComponent } from './checkout.component';

/** Golden WU checkout-courier-estimate-key — courierEstimateKey. */
describe('CheckoutComponent courierEstimateKey (golden WU)', () => {
  it('picks single vs range i18n keys from courierEstimate', () => {
    const cmp = Object.create(CheckoutComponent.prototype) as CheckoutComponent;
    (cmp as any).courierEstimate = () => null;
    expect(cmp.courierEstimateKey('sameday' as any)).toBeNull();
    (cmp as any).courierEstimate = () => ({ min: 2, max: 2 });
    expect(cmp.courierEstimateKey('sameday' as any)).toBe('checkout.deliveryEstimateSingle');
    (cmp as any).courierEstimate = () => ({ min: 1, max: 3 });
    expect(cmp.courierEstimateKey('fan_courier' as any)).toBe('checkout.deliveryEstimateRange');
  });
});
