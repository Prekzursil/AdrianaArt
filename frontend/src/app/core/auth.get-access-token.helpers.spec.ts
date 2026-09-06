import { AuthService } from './auth.service';

/** Golden WU auth-get-access-token — getAccessToken. */
describe('AuthService getAccessToken (golden WU)', () => {
  it('returns access_token or null', () => {
    const svc = Object.create(AuthService.prototype) as AuthService;
    Object.assign(svc as any, { tokens: null });
    expect(svc.getAccessToken()).toBeNull();
    Object.assign(svc as any, { tokens: { access_token: 'atk' } });
    expect(svc.getAccessToken()).toBe('atk');
  });
});
