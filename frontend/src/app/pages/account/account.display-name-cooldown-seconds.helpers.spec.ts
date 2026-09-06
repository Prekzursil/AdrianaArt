import { AccountState } from './account.state';

/** Golden WU account-display-name-cooldown-seconds — displayNameCooldownSeconds. */
describe('AccountState displayNameCooldownSeconds (golden WU)', () => {
  it('delegates cooldownRemainingSeconds for display_name', () => {
    const cmp = Object.create(AccountState.prototype) as AccountState;
    const info = { next_allowed_at: '2099-01-01T00:00:00Z' };
    Object.assign(cmp as any, {
      cooldowns: () => ({ display_name: info }),
      cooldownRemainingSeconds: (v: unknown) => (v === info ? 17 : -1),
    });
    expect(cmp.displayNameCooldownSeconds()).toBe(17);
  });
});
