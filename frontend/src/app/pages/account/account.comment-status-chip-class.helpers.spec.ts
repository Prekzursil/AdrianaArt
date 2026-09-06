import { AccountState } from './account.state';

/** Golden WU account-comment-status-chip-class — commentStatusChipClass. */
describe('AccountState commentStatusChipClass (golden WU)', () => {
  it('maps posted/hidden/deleted/default to chip class strings', () => {
    const cmp = Object.create(AccountState.prototype) as AccountState;
    expect(cmp.commentStatusChipClass('posted')).toContain('emerald');
    expect(cmp.commentStatusChipClass('hidden')).toContain('amber');
    expect(cmp.commentStatusChipClass('deleted')).toContain('slate');
    expect(cmp.commentStatusChipClass('other')).toContain('slate');
  });
});
