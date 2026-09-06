import { CheckoutComponent } from './checkout.component';

/** Golden WU checkout-set-courier -- setCourier. */
describe('CheckoutComponent setCourier (golden WU)', () => {
  it('rejects unavailable couriers and applies allowed ones', () => {
    const cmp = Object.create(CheckoutComponent.prototype) as CheckoutComponent;
    Object.assign(cmp as any, {
      deliveryAllowedCouriers: ['sameday'],
      courier: 'sameday',
      deliveryError: '',
      translate: { instant: (k: string) => k },
      onCourierChanged: jasmine.createSpy('onCourierChanged'),
    });

    cmp.setCourier('fan_courier' as any);
    expect((cmp as any).deliveryError).toBe('checkout.courierUnavailable');
    expect((cmp as any).courier).toBe('sameday');

    cmp.setCourier('sameday' as any);
    expect((cmp as any).courier).toBe('sameday');
    expect((cmp as any).onCourierChanged).toHaveBeenCalled();
  });
});
