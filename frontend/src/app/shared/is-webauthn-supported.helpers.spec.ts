import { isWebAuthnSupported } from './webauthn';

describe('isWebAuthnSupported (golden WU)', () => {
  it('reflects PublicKeyCredential presence in window', () => {
    // ChromeHeadless typically supports WebAuthn APIs or not — assert boolean + defensive shape
    const result = isWebAuthnSupported();
    expect(typeof result).toBe('boolean');
    const hasApi = typeof (window as any).PublicKeyCredential !== 'undefined';
    expect(result).toBe(hasApi);
  });
});
