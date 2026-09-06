import { CheckoutComponent } from './checkout.component';
import * as phoneUtil from '../../shared/phone';

/** Golden WU checkout-email-phone-gates-helpers. */
describe('CheckoutComponent email/phone gate helpers (golden WU)', () => {
  function bare(overrides: Record<string, unknown> = {}): CheckoutComponent {
    const cmp = Object.create(CheckoutComponent.prototype) as CheckoutComponent;
    Object.assign(cmp as any, {
      auth: { user: () => null },
      guestPhoneCountry: 'RO',
      guestPhoneNational: '',
      shippingPhoneCountry: 'RO',
      shippingPhoneNational: '',
      primaryEmailVerificationResendUntil: 0,
      deliveryType: 'home',
      phoneRequiredHome: true,
      phoneRequiredLocker: false,
      ...overrides,
    });
    return cmp;
  }

  it('emailVerified mirrors auth.user().email_verified', () => {
    expect(bare().emailVerified()).toBe(false);
    expect(bare({ auth: { user: () => ({ email_verified: true }) } }).emailVerified()).toBe(true);
  });

  it('guestPhoneE164 / shippingPhoneE164 delegate to buildE164', () => {
    const spy = spyOn(phoneUtil, 'buildE164').and.returnValue('+40700000000');
    const cmp = bare({ guestPhoneNational: '700000000', shippingPhoneNational: '711111111' });
    expect(cmp.guestPhoneE164()).toBe('+40700000000');
    expect(spy).toHaveBeenCalledWith('RO' as any, '700000000');
    expect(cmp.shippingPhoneE164()).toBe('+40700000000');
    expect(spy).toHaveBeenCalledWith('RO' as any, '711111111');
  });

  it('shippingPhoneRequired uses home/locker required flags', () => {
    const cmp = bare({
      deliveryType: 'home',
      phoneRequiredHome: true,
      phoneRequiredLocker: false,
    });
    expect(cmp.shippingPhoneRequired()).toBe(true);
    (cmp as any).deliveryType = 'locker';
    expect(cmp.shippingPhoneRequired()).toBe(false);
    (cmp as any).phoneRequiredLocker = true;
    expect(cmp.shippingPhoneRequired()).toBe(true);
  });

  it('primaryEmailVerificationResendRemainingSeconds clamps to zero', () => {
    expect(
      bare({ primaryEmailVerificationResendUntil: 0 }).primaryEmailVerificationResendRemainingSeconds(),
    ).toBe(0);
    const cmp = bare({ primaryEmailVerificationResendUntil: Date.now() + 2500 });
    const remaining = cmp.primaryEmailVerificationResendRemainingSeconds();
    expect(remaining).toBeGreaterThanOrEqual(2);
    expect(remaining).toBeLessThanOrEqual(3);
  });
});
