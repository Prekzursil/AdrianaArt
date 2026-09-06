import { AuthService } from './auth.service';

/** Golden WU auth-is-admin — isAdmin. */
describe('AuthService isAdmin (golden WU)', () => {
  it('is true for admin and owner roles only', () => {
    const svc = Object.create(AuthService.prototype) as AuthService;
    (svc as any).role = () => 'admin';
    expect(svc.isAdmin()).toBe(true);
    (svc as any).role = () => 'owner';
    expect(svc.isAdmin()).toBe(true);
    (svc as any).role = () => 'support';
    expect(svc.isAdmin()).toBe(false);
    (svc as any).role = () => null;
    expect(svc.isAdmin()).toBe(false);
  });
});
