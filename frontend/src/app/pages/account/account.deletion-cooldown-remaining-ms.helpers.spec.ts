import { AccountState } from './account.state';

/** Golden WU account-deletion-cooldown-remaining-ms — deletionCooldownRemainingMs. */
describe('AccountState deletionCooldownRemainingMs (golden WU)', () => {
  it('returns null without schedule and clamps elapsed to zero', () => {
    const cmp = Object.create(AccountState.prototype) as AccountState;
    Object.assign(cmp as any, {
      deletionStatus: () => null,
      parseTimestampMs: () => null,
      now: () => 1_000,
    });
    expect(cmp.deletionCooldownRemainingMs()).toBeNull();

    Object.assign(cmp as any, {
      deletionStatus: () => ({ scheduled_for: 't' }),
      parseTimestampMs: () => 1_500,
      now: () => 1_000,
    });
    expect(cmp.deletionCooldownRemainingMs()).toBe(500);

    Object.assign(cmp as any, { now: () => 2_000 });
    expect(cmp.deletionCooldownRemainingMs()).toBe(0);
  });
});
