import { CheckoutComponent } from './checkout.component';
import type { LockerProvider } from '../../core/shipping.service';

describe('CheckoutComponent courier estimate helpers (golden WU)', () => {
  function createCmp(overrides: Record<string, unknown> = {}) {
    const cmp = Object.create(CheckoutComponent.prototype) as CheckoutComponent;
    (cmp as any).deliveryAllowedCouriers = ['sameday', 'fan_courier'] as LockerProvider[];
    (cmp as any).deliveryType = 'home';
    Object.assign(cmp, overrides);
    return cmp;
  }

  it('courierAllowed respects deliveryAllowedCouriers list', () => {
    const cmp = createCmp({ deliveryAllowedCouriers: ['sameday'] });
    expect(cmp.courierAllowed('sameday')).toBeTrue();
    expect(cmp.courierAllowed('fan_courier')).toBeFalse();
    const empty = createCmp({ deliveryAllowedCouriers: null });
    expect(empty.courierAllowed('sameday')).toBeFalse();
  });

  it('courierEstimate returns home/locker windows per provider', () => {
    const home = createCmp({ deliveryType: 'home' });
    expect(home.courierEstimate('sameday')).toEqual({ min: 1, max: 2 });
    expect(home.courierEstimate('fan_courier')).toEqual({ min: 1, max: 3 });
    const locker = createCmp({ deliveryType: 'locker' });
    expect(locker.courierEstimate('sameday')).toEqual({ min: 1, max: 3 });
    expect(locker.courierEstimate('fan_courier')).toEqual({ min: 2, max: 4 });
  });

  it('courierEstimateKey chooses single vs range i18n keys', () => {
    const cmp = createCmp({ deliveryType: 'home' });
    expect(cmp.courierEstimateKey('sameday')).toBe('checkout.deliveryEstimateRange');
    spyOn(cmp, 'courierEstimate').and.returnValue({ min: 2, max: 2 });
    expect(cmp.courierEstimateKey('sameday')).toBe('checkout.deliveryEstimateSingle');
    (cmp.courierEstimate as jasmine.Spy).and.returnValue(null);
    expect(cmp.courierEstimateKey('sameday')).toBeNull();
  });
});
