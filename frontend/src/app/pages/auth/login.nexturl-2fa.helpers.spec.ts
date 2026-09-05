import { LoginComponent } from './login.component';

describe('LoginComponent nextUrl + 2FA + captcha helpers (golden WU)', () => {
  function make(overrides: Record<string, unknown> = {}): any {
    const proto = Object.create(LoginComponent.prototype);
    Object.assign(proto, {
      twoFactorToken: 'tok',
      twoFactorUserEmail: 'a@b.co',
      twoFactorCode: '123456',
      loading: true,
      captchaToken: 'cap',
      captcha: { reset: jasmine.createSpy('reset') },
      ...overrides,
    });
    return proto;
  }

  describe('normalizeNextUrl', () => {
    it('keeps relative app paths', () => {
      const c = make();
      expect(c.normalizeNextUrl('/shop')).toBe('/shop');
      expect(c.normalizeNextUrl('/account/orders')).toBe('/account/orders');
    });

    it('rejects empty, external, protocol-relative, and login loops', () => {
      const c = make();
      expect(c.normalizeNextUrl(null)).toBeNull();
      expect(c.normalizeNextUrl('')).toBeNull();
      expect(c.normalizeNextUrl('   ')).toBeNull();
      expect(c.normalizeNextUrl('//evil.com')).toBeNull();
      expect(c.normalizeNextUrl('/login')).toBeNull();
      expect(c.normalizeNextUrl('/login?x=1')).toBeNull();
      expect(c.normalizeNextUrl('https://evil.com')).toBeNull();
    });
  });

  describe('cancelTwoFactor', () => {
    it('clears 2FA fields and session keys', () => {
      const removeItem = jasmine.createSpy('removeItem');
      spyOnProperty(window, 'sessionStorage', 'get').and.returnValue({
        removeItem,
        getItem: () => null,
        setItem: () => undefined,
        clear: () => undefined,
        key: () => null,
        length: 0,
      } as Storage);
      const c = make();
      c.cancelTwoFactor();
      expect(c.twoFactorToken).toBeNull();
      expect(c.twoFactorUserEmail).toBeNull();
      expect(c.twoFactorCode).toBe('');
      expect(c.loading).toBe(false);
      expect(removeItem).toHaveBeenCalledWith('two_factor_token');
      expect(removeItem).toHaveBeenCalledWith('two_factor_user');
      expect(removeItem).toHaveBeenCalledWith('two_factor_remember');
    });
  });

  describe('resetCaptcha', () => {
    it('nulls captchaToken and resets widget when present', () => {
      const c = make();
      c.resetCaptcha();
      expect(c.captchaToken).toBeNull();
      expect(c.captcha.reset).toHaveBeenCalled();
    });

    it('tolerates missing captcha widget', () => {
      const c = make({ captcha: undefined });
      expect(() => c.resetCaptcha()).not.toThrow();
      expect(c.captchaToken).toBeNull();
    });
  });
});
