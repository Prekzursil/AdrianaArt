import { CheckoutComponent } from './checkout.component';

/** Golden WU — courierEstimate / Key / Params. */
describe('CheckoutComponent courierEstimate helpers (golden WU)', () => {
  function bare(deliveryType: 'home' | 'locker' = 'home'): CheckoutComponent {
    const cmp = Object.create(CheckoutComponent.prototype) as CheckoutComponent;
    (cmp as any).deliveryType = deliveryType;
    return cmp;
  }

  it('courierEstimate returns provider/delivery matrix rows', () => {
    expect(bare('home').courierEstimate('sameday')).toEqual({ min: 1, max: 2 });
    expect(bare('locker').courierEstimate('sameday')).toEqual({ min: 1, max: 3 });
    expect(bare('home').courierEstimate('fan_courier')).toEqual({ min: 1, max: 3 });
    expect(bare('locker').courierEstimate('fan_courier')).toEqual({ min: 2, max: 4 });
    expect(bare().courierEstimate('unknown' as any)).toBeNull();
  });

  it('courierEstimateKey distinguishes single vs range', () => {
    const cmp = bare('home');
    spyOn(cmp, 'courierEstimate').and.returnValues({ min: 2, max: 2 }, { min: 1, max: 3 }, null);
    expect(cmp.courierEstimateKey('sameday')).toBe('checkout.deliveryEstimateSingle');
    expect(cmp.courierEstimateKey('sameday')).toBe('checkout.deliveryEstimateRange');
    expect(cmp.courierEstimateKey('sameday')).toBeNull();
  });

  it('courierEstimateParams returns days or min/max', () => {
    const cmp = bare('home');
    spyOn(cmp, 'courierEstimate').and.returnValues({ min: 2, max: 2 }, { min: 1, max: 3 }, null);
    expect(cmp.courierEstimateParams('sameday')).toEqual({ days: 2 });
    expect(cmp.courierEstimateParams('sameday')).toEqual({ min: 1, max: 3 });
    expect(cmp.courierEstimateParams('sameday')).toEqual({});
  });
});
