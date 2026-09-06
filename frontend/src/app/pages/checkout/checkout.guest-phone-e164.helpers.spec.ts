import { CheckoutComponent } from './checkout.component';
import * as phoneUtil from '../../shared/phone';

/** Golden WU tip — guestPhoneE164. */
describe('CheckoutComponent guestPhoneE164 (golden WU)', () => {
  it('defaults country to RO and delegates to buildE164', () => {
    const cmp = Object.create(CheckoutComponent.prototype) as CheckoutComponent;
    (cmp as any).guestPhoneCountry = '';
    (cmp as any).guestPhoneNational = '712345678';
    const spy = spyOn(phoneUtil, 'buildE164').and.returnValue('+40712345678');
    expect(cmp.guestPhoneE164()).toBe('+40712345678');
    expect(spy).toHaveBeenCalledWith('RO' as any, '712345678');
    (cmp as any).guestPhoneCountry = 'US';
    (cmp as any).guestPhoneNational = '2025550100';
    spy.and.returnValue('+12025550100');
    expect(cmp.guestPhoneE164()).toBe('+12025550100');
    expect(spy).toHaveBeenCalledWith('US' as any, '2025550100');
  });
});
