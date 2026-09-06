import { AccountState } from './account.state';

/** Golden WU account-secondary-email-resend-remaining-seconds — secondaryEmailResendRemainingSeconds. */
describe('AccountState secondaryEmailResendRemainingSeconds (golden WU)', () => {
  it('looks up per-id deadlines and ceils remaining seconds', () => {
    const cmp = Object.create(AccountState.prototype) as AccountState;
    Object.assign(cmp as any, {
      secondaryEmailResendUntilById: () => ({}),
      now: () => 0,
    });
    expect(cmp.secondaryEmailResendRemainingSeconds('e1')).toBe(0);

    Object.assign(cmp as any, {
      secondaryEmailResendUntilById: () => ({ e1: 3_100 }),
      now: () => 1_000,
    });
    expect(cmp.secondaryEmailResendRemainingSeconds('e1')).toBe(3);
    expect(cmp.secondaryEmailResendRemainingSeconds('missing')).toBe(0);
  });
});
