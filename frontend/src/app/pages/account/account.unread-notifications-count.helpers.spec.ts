import { AccountState } from './account.state';

/** Golden WU account-unread-notifications-count — unreadNotificationsCount. */
describe('AccountState unreadNotificationsCount (golden WU)', () => {
  it('delegates to notificationsService.unreadCount', () => {
    const cmp = Object.create(AccountState.prototype) as AccountState;
    Object.assign(cmp as any, {
      notificationsService: { unreadCount: () => 7 },
    });
    expect(cmp.unreadNotificationsCount()).toBe(7);
  });
});
