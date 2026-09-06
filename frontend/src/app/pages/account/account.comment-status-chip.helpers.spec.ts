import { AccountState } from './account.state';

/** Golden WU account-comment-status-chip — commentStatusChipClass. */
describe('AccountState commentStatusChipClass (golden WU)', () => {
  it('maps posted/hidden/deleted and falls back', () => {
    const cmp = Object.create(AccountState.prototype) as AccountState;
    expect(cmp.commentStatusChipClass('posted')).toContain('emerald');
    expect(cmp.commentStatusChipClass('hidden')).toContain('amber');
    expect(cmp.commentStatusChipClass('deleted')).toContain('slate');
    expect(cmp.commentStatusChipClass('unknown')).toContain('slate');
  });
});
