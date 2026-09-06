import { CheckoutComponent } from './checkout.component';

/** Golden WU checkout-is-valid-email — isValidEmail. */
describe('CheckoutComponent isValidEmail (golden WU)', () => {
  it('rejects blank/malformed; accepts simple domain emails', () => {
    const cmp = Object.create(CheckoutComponent.prototype) as CheckoutComponent;
    expect((cmp as any).isValidEmail('')).toBe(false);
    expect((cmp as any).isValidEmail('nope')).toBe(false);
    expect((cmp as any).isValidEmail('@x.com')).toBe(false);
    expect((cmp as any).isValidEmail('a@')).toBe(false);
    expect((cmp as any).isValidEmail('a@b')).toBe(false);
    expect((cmp as any).isValidEmail('a@b.com')).toBe(true);
    expect((cmp as any).isValidEmail('  a@b.com  ')).toBe(true);
    expect((cmp as any).isValidEmail('x'.repeat(256) + '@b.com')).toBe(false);
  });
});
