import { AuthService } from './auth.service';

/** Golden WU auth-get-refresh-token — getRefreshToken. */
describe('AuthService getRefreshToken (golden WU)', () => {
  it('returns refresh_token or null', () => {
    const svc = Object.create(AuthService.prototype) as AuthService;
    Object.assign(svc as any, { tokens: null });
    expect(svc.getRefreshToken()).toBeNull();
    Object.assign(svc as any, { tokens: { refresh_token: 'rtk' } });
    expect(svc.getRefreshToken()).toBe('rtk');
  });
});
