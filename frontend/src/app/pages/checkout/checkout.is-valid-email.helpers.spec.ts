import { CheckoutComponent } from './checkout.component';

/** Golden WU checkout-is-valid-email — private isValidEmail arms. */
describe('CheckoutComponent isValidEmail helpers (golden WU)', () => {
  function createCmp(): CheckoutComponent {
    return Object.create(CheckoutComponent.prototype) as CheckoutComponent;
  }

  it('rejects empty, oversized, and malformed emails', () => {
    const cmp = createCmp() as any;
    expect(cmp.isValidEmail('')).toBe(false);
    expect(cmp.isValidEmail('   ')).toBe(false);
    expect(cmp.isValidEmail('a'.repeat(250) + '@x.com')).toBe(false); // >255
    expect(cmp.isValidEmail('nodomain@')).toBe(false);
    expect(cmp.isValidEmail('@nouser.com')).toBe(false);
    expect(cmp.isValidEmail('user@nodot')).toBe(false);
  });

  it('accepts typical emails after trim', () => {
    const cmp = createCmp() as any;
    expect(cmp.isValidEmail('  a@b.co  ')).toBe(true);
    expect(cmp.isValidEmail('name+tag@example.com')).toBe(true);
  });

  it('rejects missing @ and empty local part', () => {
    const cmp = createCmp() as any;
    expect(cmp.isValidEmail('plainaddress')).toBe(false);
    expect(cmp.isValidEmail('@example.com')).toBe(false);
  });
});
