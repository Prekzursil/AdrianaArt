import { AccountState } from './account.state';

/** Golden WU account-deletion-cooldown-progress-percent — deletionCooldownProgressPercent. */
describe('AccountState deletionCooldownProgressPercent (golden WU)', () => {
  it('returns 0 for invalid windows and clamps mid/late progress', () => {
    const cmp = Object.create(AccountState.prototype) as AccountState;
    Object.assign(cmp as any, {
      deletionStatus: () => ({ requested_at: 'a', scheduled_for: 'b' }),
      parseTimestampMs: (v: string) => (v === 'a' ? 0 : v === 'b' ? 100 : null),
      now: () => 50,
    });
    expect(cmp.deletionCooldownProgressPercent()).toBe(50);

    Object.assign(cmp as any, { now: () => -10 });
    expect(cmp.deletionCooldownProgressPercent()).toBe(0);

    Object.assign(cmp as any, { now: () => 200 });
    expect(cmp.deletionCooldownProgressPercent()).toBe(100);

    Object.assign(cmp as any, {
      parseTimestampMs: () => null,
    });
    expect(cmp.deletionCooldownProgressPercent()).toBe(0);
  });
});
