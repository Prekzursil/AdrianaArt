import { AuthService } from './auth.service';

/** Golden WU auth-is-jwt-expired — isJwtExpired. */
describe('AuthService isJwtExpired (golden WU)', () => {
  it('treats missing exp as expired; compares with skew', () => {
    const svc = Object.create(AuthService.prototype) as AuthService;
    Object.assign(svc as any, { parseJwtExpiry: () => null });
    expect((svc as any).isJwtExpired('t')).toBe(true);
    const now = Math.floor(Date.now() / 1000);
    Object.assign(svc as any, { parseJwtExpiry: () => now + 120 });
    expect((svc as any).isJwtExpired('t', 30)).toBe(false);
    Object.assign(svc as any, { parseJwtExpiry: () => now + 10 });
    expect((svc as any).isJwtExpired('t', 30)).toBe(true);
  });
});
