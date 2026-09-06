import { AuthService } from './auth.service';

/** Golden WU auth-is-impersonating — isImpersonating. */
describe('AuthService isImpersonating (golden WU)', () => {
  it('requires access token and impersonation claim', () => {
    const svc = Object.create(AuthService.prototype) as AuthService;
    Object.assign(svc as any, {
      tokens: null,
      isImpersonationToken: () => true,
    });
    expect(svc.isImpersonating()).toBe(false);
    Object.assign(svc as any, {
      tokens: { access_token: 't' },
      isImpersonationToken: (t: string) => t === 't',
    });
    expect(svc.isImpersonating()).toBe(true);
    Object.assign(svc as any, { isImpersonationToken: () => false });
    expect(svc.isImpersonating()).toBe(false);
  });
});
