import { CheckoutComponent } from './checkout.component';

describe('CheckoutComponent shippingPhoneE164 (golden WU)', () => {
  it('builds E.164 from shipping phone country/national', () => {
    const cmp = Object.create(CheckoutComponent.prototype) as any;
    cmp.shippingPhoneCountry = 'RO';
    cmp.shippingPhoneNational = '712345678';
    expect(cmp.shippingPhoneE164()).toBe('+40712345678');
    cmp.shippingPhoneNational = 'abc';
    expect(cmp.shippingPhoneE164()).toBeNull();
  });
});
