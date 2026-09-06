import { CheckoutComponent } from './checkout.component';

describe('CheckoutComponent effectivePhoneE164 (golden WU)', () => {
  it('prefers shipping, then auth user phone, then guest when creating account', () => {
    const cmp = Object.create(CheckoutComponent.prototype) as any;
    cmp.shippingPhoneCountry = 'RO';
    cmp.shippingPhoneNational = '';
    cmp.guestPhoneCountry = 'RO';
    cmp.guestPhoneNational = '712345678';
    cmp.guestCreateAccount = false;
    cmp.auth = { user: () => null };
    expect(cmp.effectivePhoneE164()).toBeNull();

    cmp.auth = { user: () => ({ phone: ' +1 2025551234 ' }) };
    expect(cmp.effectivePhoneE164()).toBe('+1 2025551234');

    cmp.shippingPhoneNational = '712345678';
    expect(cmp.effectivePhoneE164()).toBe('+40712345678');

    cmp.shippingPhoneNational = '';
    cmp.auth = { user: () => ({ phone: '' }) };
    cmp.guestCreateAccount = true;
    expect(cmp.effectivePhoneE164()).toBe('+40712345678');
  });
});
