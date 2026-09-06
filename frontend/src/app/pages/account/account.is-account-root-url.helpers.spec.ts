import { AccountState } from './account.state';

/** Golden WU account-is-account-root-url — isAccountRootUrl. */
describe('AccountState isAccountRootUrl (golden WU)', () => {
  function bare(): AccountState {
    return Object.create(AccountState.prototype) as AccountState;
  }

  it('detects account root vs nested paths', () => {
    const state = bare() as any;
    expect(state.isAccountRootUrl('/account')).toBe(true);
    expect(state.isAccountRootUrl('/en/account')).toBe(true);
    expect(state.isAccountRootUrl('/account?x=1')).toBe(true);
    expect(state.isAccountRootUrl('/account/orders')).toBe(false);
    expect(state.isAccountRootUrl('/shop')).toBe(false);
    expect(state.isAccountRootUrl('')).toBe(false);
  });
});
