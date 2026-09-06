import { CheckoutComponent } from './checkout.component';

describe('CheckoutComponent courierAllowed (golden WU)', () => {
  it('true only when provider is in deliveryAllowedCouriers', () => {
    const cmp = Object.create(CheckoutComponent.prototype) as CheckoutComponent;
    (cmp as any).deliveryAllowedCouriers = ['sameday', 'fan_courier'];
    expect(cmp.courierAllowed('sameday' as any)).toBe(true);
    expect(cmp.courierAllowed('fan_courier' as any)).toBe(true);
    expect(cmp.courierAllowed('other' as any)).toBe(false);

    (cmp as any).deliveryAllowedCouriers = null;
    expect(cmp.courierAllowed('sameday' as any)).toBe(false);
  });
});
