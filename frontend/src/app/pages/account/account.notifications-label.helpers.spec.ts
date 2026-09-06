import { AccountState } from './account.state';

/** Golden WU account-notifications-label — notificationsLabel. */
describe('AccountState notificationsLabel (golden WU)', () => {
  it('reports loading, all-off, and enabled counts', () => {
    const cmp = Object.create(AccountState.prototype) as AccountState;
    Object.assign(cmp as any, {
      t: (k: string, p?: any) => (p ? `${k}:${p.count}` : k),
      profile: () => null,
      notifyBlogCommentReplies: false,
      notifyBlogComments: false,
      notifyMarketing: false,
    });
    expect(cmp.notificationsLabel()).toBe('notifications.loading');

    Object.assign(cmp as any, { profile: () => ({ id: 'u1' }) });
    expect(cmp.notificationsLabel()).toBe('account.overview.notificationsAllOff');

    Object.assign(cmp as any, {
      notifyBlogCommentReplies: true,
      notifyMarketing: true,
    });
    expect(cmp.notificationsLabel()).toBe('account.overview.notificationsEnabled:2');
  });
});
