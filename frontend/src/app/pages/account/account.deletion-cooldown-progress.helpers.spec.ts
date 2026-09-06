import { signal } from '@angular/core';
import { AccountState } from './account.state';

/** Golden WU account-deletion-cooldown-progress — deletionCooldownProgressPercent. */
describe('AccountState deletionCooldownProgressPercent (golden WU)', () => {
  function bare(overrides: Record<string, unknown> = {}): AccountState {
    const state = Object.create(AccountState.prototype) as AccountState;
    Object.assign(state as any, {
      deletionStatus: signal(null),
      now: signal(1_000_000),
      ...overrides,
    });
    return state;
  }

  it('returns 0 without valid window and clamps mid progress', () => {
    expect(bare().deletionCooldownProgressPercent()).toBe(0);
    expect(
      bare({
        deletionStatus: signal({ requested_at: 'bad', scheduled_for: 'also-bad' }),
      }).deletionCooldownProgressPercent(),
    ).toBe(0);
    const start = new Date(500_000).toISOString();
    const end = new Date(1_500_000).toISOString();
    expect(
      bare({ deletionStatus: signal({ requested_at: start, scheduled_for: end }) }).deletionCooldownProgressPercent(),
    ).toBe(50);
    expect(
      bare({
        now: signal(2_000_000),
        deletionStatus: signal({ requested_at: start, scheduled_for: end }),
      }).deletionCooldownProgressPercent(),
    ).toBe(100);
  });
});
