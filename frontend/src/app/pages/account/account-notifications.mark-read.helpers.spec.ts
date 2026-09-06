import { of } from 'rxjs';
import { AccountNotificationsInboxComponent } from './account-notifications-inbox.component';

/** Golden WU account-notifications-mark-read -- markRead. */
describe('AccountNotificationsInboxComponent markRead (golden WU)', () => {
  it('posts read and refreshes unread count', () => {
    const cmp = Object.create(
      AccountNotificationsInboxComponent.prototype,
    ) as AccountNotificationsInboxComponent;
    const updated = { id: 'n1', read_at: 'now' };
    Object.assign(cmp as any, {
      items: [{ id: 'n1', read_at: null }, { id: 'n2' }],
      api: { post: jasmine.createSpy('post').and.returnValue(of(updated)) },
      notifications: { refreshUnreadCount: jasmine.createSpy('refresh') },
    });
    cmp.markRead({ id: 'n1' } as any);
    expect((cmp as any).api.post).toHaveBeenCalled();
    expect((cmp as any).items[0]).toEqual(updated);
    expect((cmp as any).notifications.refreshUnreadCount).toHaveBeenCalled();
  });
});
