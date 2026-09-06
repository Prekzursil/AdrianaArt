import { isWebAuthnSupported } from './webauthn';

/** Golden WU is-web-authn-supported — isWebAuthnSupported. */
describe('isWebAuthnSupported (golden WU)', () => {
  it('returns a boolean for the current window context', () => {
    expect(typeof isWebAuthnSupported()).toBe('boolean');
  });
});
