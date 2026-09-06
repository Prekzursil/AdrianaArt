import { LoginComponent } from './login.component';

/** Golden WU login-cancel-two-factor — cancelTwoFactor. */
describe('LoginComponent cancelTwoFactor (golden WU)', () => {
  it('clears 2FA fields and loading flag', () => {
    const cmp = Object.create(LoginComponent.prototype) as LoginComponent;
    Object.assign(cmp as any, {
      twoFactorToken: 'tok',
      twoFactorUserEmail: 'a@b.c',
      twoFactorCode: '123456',
      loading: true,
    });
    cmp.cancelTwoFactor();
    expect((cmp as any).twoFactorToken).toBeNull();
    expect((cmp as any).twoFactorUserEmail).toBeNull();
    expect((cmp as any).twoFactorCode).toBe('');
    expect((cmp as any).loading).toBe(false);
  });
});
