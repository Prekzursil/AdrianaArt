import { AccountState } from './account.state';

/** Golden WU account-username-cooldown-seconds — usernameCooldownSeconds. */
describe('AccountState usernameCooldownSeconds (golden WU)', () => {
  it('delegates cooldownRemainingSeconds for username', () => {
    const cmp = Object.create(AccountState.prototype) as AccountState;
    const info = { next_allowed_at: '2099-01-01T00:00:00Z' };
    Object.assign(cmp as any, {
      cooldowns: () => ({ username: info }),
      cooldownRemainingSeconds: (v: unknown) => (v === info ? 42 : -1),
    });
    expect(cmp.usernameCooldownSeconds()).toBe(42);
  });
});
