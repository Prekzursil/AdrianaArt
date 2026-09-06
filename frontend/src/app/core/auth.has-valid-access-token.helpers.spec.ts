import { AuthService } from './auth.service';

/** Golden WU auth-has-valid-access-token — hasValidAccessToken. */
describe('AuthService hasValidAccessToken (golden WU)', () => {
  it('true only when access token present and not expired', () => {
    const svc = Object.create(AuthService.prototype) as AuthService;
    Object.assign(svc as any, {
      tokens: null,
      isJwtExpired: () => false,
    });
    expect((svc as any).hasValidAccessToken()).toBe(false);
    Object.assign(svc as any, {
      tokens: { access_token: 'a' },
      isJwtExpired: (t: string) => t !== 'a',
    });
    expect((svc as any).hasValidAccessToken()).toBe(true);
    Object.assign(svc as any, { isJwtExpired: () => true });
    expect((svc as any).hasValidAccessToken()).toBe(false);
  });
});
