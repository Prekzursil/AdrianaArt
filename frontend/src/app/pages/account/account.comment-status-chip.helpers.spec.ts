import { AccountState } from './account.state';

/** Golden WU account-comment-status-chip — commentStatusChipClass. */
describe('AccountState commentStatusChipClass (golden WU)', () => {
  it('maps approved/pending/rejected and falls back', () => {
    const cmp = Object.create(AccountState.prototype) as AccountState;
    expect(cmp.commentStatusChipClass('approved')).toContain('emerald');
    expect(cmp.commentStatusChipClass('pending')).toContain('amber');
    expect(cmp.commentStatusChipClass('rejected')).toContain('slate');
    expect(cmp.commentStatusChipClass('unknown')).toContain('slate');
  });
});
