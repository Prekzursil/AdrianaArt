import { AccountState } from './account.state';

/** Golden WU account-email-cooldown-seconds — emailCooldownSeconds. */
describe('AccountState emailCooldownSeconds (golden WU)', () => {
  it('delegates cooldownRemainingSeconds for email', () => {
    const cmp = Object.create(AccountState.prototype) as AccountState;
    const info = { next_allowed_at: '2099-01-01T00:00:00Z' };
    Object.assign(cmp as any, {
      cooldowns: () => ({ email: info }),
      cooldownRemainingSeconds: (v: unknown) => (v === info ? 9 : -1),
    });
    expect(cmp.emailCooldownSeconds()).toBe(9);
  });
});
