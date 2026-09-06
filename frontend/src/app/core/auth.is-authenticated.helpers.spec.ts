import { AuthService } from './auth.service';

/** Golden WU auth-is-authenticated — isAuthenticated. */
describe('AuthService isAuthenticated (golden WU)', () => {
  it('is true only when userSignal is set', () => {
    const svc = Object.create(AuthService.prototype) as AuthService;
    Object.assign(svc as any, { userSignal: () => null });
    expect(svc.isAuthenticated()).toBe(false);
    Object.assign(svc as any, { userSignal: () => ({ id: 'u1' }) });
    expect(svc.isAuthenticated()).toBe(true);
  });
});
