import { AccountState } from './account.state';
import * as webauthn from '../../shared/webauthn';

/** Golden WU account-passkeys-supported — passkeysSupported. */
describe('AccountState passkeysSupported (golden WU)', () => {
  it('delegates to isWebAuthnSupported', () => {
    const cmp = Object.create(AccountState.prototype) as AccountState;
    const spy = spyOn(webauthn, 'isWebAuthnSupported').and.returnValue(true);
    expect(cmp.passkeysSupported()).toBe(true);
    spy.and.returnValue(false);
    expect(cmp.passkeysSupported()).toBe(false);
  });
});
