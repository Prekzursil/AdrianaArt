import { AdminCouponsComponent } from './admin-coupons.component';

/** Golden WU coupons-is-valid-email — isValidEmail. */
describe('AdminCouponsComponent isValidEmail (golden WU)', () => {
  it('accepts simple emails and rejects malformed', () => {
    const cmp = Object.create(AdminCouponsComponent.prototype) as any;
    expect(cmp.isValidEmail('a@b.co')).toBe(true);
    expect(cmp.isValidEmail(' bad ')).toBe(false);
    expect(cmp.isValidEmail('@x.com')).toBe(false);
    expect(cmp.isValidEmail('a@nodot')).toBe(false);
    expect(cmp.isValidEmail('')).toBe(false);
  });
});
