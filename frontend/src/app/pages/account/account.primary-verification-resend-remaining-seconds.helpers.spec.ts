import { AccountState } from './account.state';

/** Golden WU account-primary-verification-resend-remaining-seconds — primaryVerificationResendRemainingSeconds. */
describe('AccountState primaryVerificationResendRemainingSeconds (golden WU)', () => {
  it('returns 0 without a deadline and ceils remaining seconds', () => {
    const cmp = Object.create(AccountState.prototype) as AccountState;
    Object.assign(cmp as any, {
      primaryVerificationResendUntil: () => null,
      now: () => 0,
    });
    expect(cmp.primaryVerificationResendRemainingSeconds()).toBe(0);

    Object.assign(cmp as any, {
      primaryVerificationResendUntil: () => 2_500,
      now: () => 1_000,
    });
    expect(cmp.primaryVerificationResendRemainingSeconds()).toBe(2);

    Object.assign(cmp as any, { now: () => 5_000 });
    expect(cmp.primaryVerificationResendRemainingSeconds()).toBe(0);
  });
});
