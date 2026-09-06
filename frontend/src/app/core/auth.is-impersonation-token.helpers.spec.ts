import { AuthService } from './auth.service';

/** Golden WU auth-is-impersonation-token — isImpersonationToken. */
describe('AuthService isImpersonationToken (golden WU)', () => {
  it('true only when impersonator claim is non-empty string', () => {
    const svc = Object.create(AuthService.prototype) as AuthService;
    Object.assign(svc as any, { parseJwtPayload: () => null });
    expect((svc as any).isImpersonationToken('t')).toBe(false);
    Object.assign(svc as any, {
      parseJwtPayload: () => ({ impersonator: '   ' }),
    });
    expect((svc as any).isImpersonationToken('t')).toBe(false);
    Object.assign(svc as any, {
      parseJwtPayload: () => ({ impersonator: 'admin-1' }),
    });
    expect((svc as any).isImpersonationToken('t')).toBe(true);
    Object.assign(svc as any, {
      parseJwtPayload: () => ({ impersonator: 42 }),
    });
    expect((svc as any).isImpersonationToken('t')).toBe(false);
  });
});
