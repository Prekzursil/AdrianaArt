import { AccountNotificationsInboxComponent } from './account-notifications-inbox.component';

/** Golden WU account-notifications-open -- openNotification. */
describe('AccountNotificationsInboxComponent openNotification (golden WU)', () => {
  it('marks unread then navigates when url present', () => {
    const cmp = Object.create(
      AccountNotificationsInboxComponent.prototype,
    ) as AccountNotificationsInboxComponent;
    Object.assign(cmp as any, {
      markRead: jasmine.createSpy('markRead'),
      router: { navigateByUrl: jasmine.createSpy('nav') },
    });
    cmp.openNotification({ id: 'n1', read_at: null, dismissed_at: null, url: '/x' } as any);
    expect((cmp as any).markRead).toHaveBeenCalled();
    expect((cmp as any).router.navigateByUrl).toHaveBeenCalledWith('/x');
  });
});
