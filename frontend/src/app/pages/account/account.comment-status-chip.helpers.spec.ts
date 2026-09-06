import { AccountState } from './account.state';

/** Golden WU account-comment-status-chip — commentStatusChipClass. */
describe('AccountState commentStatusChipClass (golden WU)', () => {
  it('maps published/pending/removed and falls back', () => {
    const cmp = Object.create(AccountState.prototype) as AccountState;
    expect(cmp.commentStatusChipClass('published')).toContain('emerald');
    expect(cmp.commentStatusChipClass('pending')).toContain('amber');
    expect(cmp.commentStatusChipClass('removed')).toContain('slate');
    expect(cmp.commentStatusChipClass('unknown')).toContain('slate');
  });
});
