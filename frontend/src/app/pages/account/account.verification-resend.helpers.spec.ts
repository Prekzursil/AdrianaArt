import { AccountState } from './account.state';

describe('AccountState primaryVerificationResendRemainingSeconds (golden WU)', () => {
  function bare(until: number | null, nowMs: number) {
    const state = Object.create(AccountState.prototype) as AccountState;
    (state as any).primaryVerificationResendUntil = () => until;
    (state as any).now = () => nowMs;
    return state;
  }

  it('returns 0 when no until', () => {
    expect(bare(null, 10_000).primaryVerificationResendRemainingSeconds()).toBe(0);
  });

  it('ceils remaining seconds and floors at 0', () => {
    expect(bare(10_500, 10_000).primaryVerificationResendRemainingSeconds()).toBe(1);
    expect(bare(12_000, 10_000).primaryVerificationResendRemainingSeconds()).toBe(2);
    expect(bare(9_000, 10_000).primaryVerificationResendRemainingSeconds()).toBe(0);
  });
});
