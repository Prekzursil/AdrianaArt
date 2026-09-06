import { of } from 'rxjs';
import { AccountNotificationsInboxComponent } from './account-notifications-inbox.component';

/** Golden WU account-notifications-dismiss -- dismiss. */
describe('AccountNotificationsInboxComponent dismiss (golden WU)', () => {
  it('posts dismiss and refreshes unread count', () => {
    const cmp = Object.create(
      AccountNotificationsInboxComponent.prototype,
    ) as AccountNotificationsInboxComponent;
    const updated = { id: 'n1', dismissed_at: 'now' };
    Object.assign(cmp as any, {
      items: [{ id: 'n1' }],
      api: { post: jasmine.createSpy('post').and.returnValue(of(updated)) },
      notifications: { refreshUnreadCount: jasmine.createSpy('refresh') },
    });
    cmp.dismiss({ id: 'n1' } as any);
    expect((cmp as any).api.post).toHaveBeenCalled();
    expect((cmp as any).items[0]).toEqual(updated);
    expect((cmp as any).notifications.refreshUnreadCount).toHaveBeenCalled();
  });
});
