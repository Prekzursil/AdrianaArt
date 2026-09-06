import { CheckoutComponent } from './checkout.component';

describe('CheckoutComponent formatCountryOption (golden WU)', () => {
  it('joins code and name', () => {
    const cmp = Object.create(CheckoutComponent.prototype) as CheckoutComponent;
    expect(cmp.formatCountryOption({ code: 'RO', name: 'Romania' } as any)).toBe('RO — Romania');
  });
});
