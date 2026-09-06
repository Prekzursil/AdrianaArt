import { AuthService } from './auth.service';

/** Golden WU auth-is-staff — isStaff. */
describe('AuthService isStaff (golden WU)', () => {
  it('accepts owner/admin/support/fulfillment/content', () => {
    const svc = Object.create(AuthService.prototype) as AuthService;
    for (const role of ['owner', 'admin', 'support', 'fulfillment', 'content']) {
      (svc as any).role = () => role;
      expect(svc.isStaff()).toBe(true);
    }
    (svc as any).role = () => 'customer';
    expect(svc.isStaff()).toBe(false);
    (svc as any).role = () => null;
    expect(svc.isStaff()).toBe(false);
  });
});
