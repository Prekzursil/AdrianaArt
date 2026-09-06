import { CheckoutComponent } from './checkout.component';

/** Golden WU tip — emailVerified. */
describe('CheckoutComponent emailVerified (golden WU)', () => {
  it('reads auth.user().email_verified', () => {
    const cmp = Object.create(CheckoutComponent.prototype) as CheckoutComponent;
    (cmp as any).auth = { user: () => null };
    expect(cmp.emailVerified()).toBe(false);
    (cmp as any).auth = { user: () => ({ email_verified: false }) };
    expect(cmp.emailVerified()).toBe(false);
    (cmp as any).auth = { user: () => ({ email_verified: true }) };
    expect(cmp.emailVerified()).toBe(true);
  });
});
