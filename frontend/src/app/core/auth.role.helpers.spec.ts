import { AuthService } from './auth.service';

/** Golden WU auth-role — role. */
describe('AuthService role (golden WU)', () => {
  it('returns user role or null', () => {
    const svc = Object.create(AuthService.prototype) as AuthService;
    Object.assign(svc as any, { userSignal: () => null });
    expect(svc.role()).toBeNull();
    Object.assign(svc as any, { userSignal: () => ({ role: 'admin' }) });
    expect(svc.role()).toBe('admin');
  });
});
