import { CheckoutComponent } from './checkout.component';
import type { LockerProvider } from '../../core/shipping.service';

/** Golden WU checkout-courier-estimate — N=3 courierEstimate / Key / Params. */
describe('CheckoutComponent courier estimate helpers (golden WU)', () => {
  function createCmp(overrides: Record<string, unknown> = {}): CheckoutComponent {
    const cmp = Object.create(CheckoutComponent.prototype) as CheckoutComponent;
    (cmp as any).deliveryType = 'home';
    Object.assign(cmp as any, overrides);
    return cmp;
  }

  it('courierEstimate returns home/locker windows per provider', () => {
    const home = createCmp({ deliveryType: 'home' });
    expect(home.courierEstimate('sameday')).toEqual({ min: 1, max: 2 });
    expect(home.courierEstimate('fan_courier')).toEqual({ min: 1, max: 3 });

    const locker = createCmp({ deliveryType: 'locker' });
    expect(locker.courierEstimate('sameday')).toEqual({ min: 1, max: 3 });
    expect(locker.courierEstimate('fan_courier')).toEqual({ min: 2, max: 4 });

    expect(home.courierEstimate('nope' as LockerProvider)).toBeNull();
  });

  it('courierEstimateKey picks single vs range i18n keys', () => {
    const cmp = createCmp({ deliveryType: 'home' });
    expect(cmp.courierEstimateKey('sameday')).toBe('checkout.deliveryEstimateRange');
    expect(cmp.courierEstimateKey('nope' as LockerProvider)).toBeNull();

    (cmp as any).courierEstimate = () => ({ min: 2, max: 2 });
    expect(cmp.courierEstimateKey('sameday')).toBe('checkout.deliveryEstimateSingle');
  });

  it('courierEstimateParams maps days or min/max', () => {
    const cmp = createCmp({ deliveryType: 'home' });
    expect(cmp.courierEstimateParams('sameday')).toEqual({ min: 1, max: 2 });
    expect(cmp.courierEstimateParams('nope' as LockerProvider)).toEqual({});

    (cmp as any).courierEstimate = () => ({ min: 3, max: 3 });
    expect(cmp.courierEstimateParams('fan_courier')).toEqual({ days: 3 });
  });
});
