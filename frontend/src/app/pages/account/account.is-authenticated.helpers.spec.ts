import { AccountState } from './account.state';

/** Golden WU account-is-authenticated — isAuthenticated. */
describe('AccountState isAuthenticated (golden WU)', () => {
  it('delegates to auth.isAuthenticated', () => {
    const cmp = Object.create(AccountState.prototype) as AccountState;
    Object.assign(cmp as any, { auth: { isAuthenticated: () => true } });
    expect(cmp.isAuthenticated()).toBe(true);
    Object.assign(cmp as any, { auth: { isAuthenticated: () => false } });
    expect(cmp.isAuthenticated()).toBe(false);
  });
});
