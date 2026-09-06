import { LoginComponent } from './login.component';

describe('LoginComponent cancelTwoFactor (golden WU)', () => {
  it('clears two-factor fields and session keys', () => {
    const cmp = Object.create(LoginComponent.prototype) as LoginComponent;
    (cmp as any).twoFactorToken = 'tok';
    (cmp as any).twoFactorUserEmail = 'a@b.c';
    (cmp as any).twoFactorCode = '123456';
    (cmp as any).loading = true;
    sessionStorage.setItem('two_factor_token', 'tok');
    sessionStorage.setItem('two_factor_user', 'a@b.c');
    sessionStorage.setItem('two_factor_remember', '1');
    cmp.cancelTwoFactor();
    expect((cmp as any).twoFactorToken).toBeNull();
    expect((cmp as any).twoFactorUserEmail).toBeNull();
    expect((cmp as any).twoFactorCode).toBe('');
    expect((cmp as any).loading).toBe(false);
    expect(sessionStorage.getItem('two_factor_token')).toBeNull();
    expect(sessionStorage.getItem('two_factor_user')).toBeNull();
    expect(sessionStorage.getItem('two_factor_remember')).toBeNull();
  });
});
