import { AccountState } from './account.state';

/** Golden WU account-is-admin — isAdmin. */
describe('AccountState isAdmin (golden WU)', () => {
  it('delegates to auth.isAdmin()', () => {
    const state = Object.create(AccountState.prototype) as AccountState;
    Object.assign(state as any, { auth: { isAdmin: () => true } });
    expect(state.isAdmin()).toBe(true);
    Object.assign(state as any, { auth: { isAdmin: () => false } });
    expect(state.isAdmin()).toBe(false);
  });
});
