import { AuthService } from './auth.service';

/** Golden WU auth-clear-step-up-token — clearStepUpToken. */
describe('AuthService clearStepUpToken (golden WU)', () => {
  it('nulls the cached step-up token', () => {
    const svc = Object.create(AuthService.prototype) as AuthService;
    Object.assign(svc as any, { stepUpToken: 'tok' });
    svc.clearStepUpToken();
    expect((svc as any).stepUpToken).toBeNull();
  });
});
