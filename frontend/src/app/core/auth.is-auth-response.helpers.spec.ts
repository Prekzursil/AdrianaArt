import { AuthService } from './auth.service';

/** Golden WU auth-is-auth-response — isAuthResponse. */
describe('AuthService isAuthResponse (golden WU)', () => {
  it('requires both access and refresh tokens', () => {
    const svc = Object.create(AuthService.prototype) as AuthService;
    expect((svc as any).isAuthResponse(null)).toBe(false);
    expect(
      (svc as any).isAuthResponse({
        tokens: { access_token: 'a', refresh_token: '' },
      }),
    ).toBe(false);
    expect(
      (svc as any).isAuthResponse({
        tokens: { access_token: 'a', refresh_token: 'r' },
      }),
    ).toBe(true);
  });
});
