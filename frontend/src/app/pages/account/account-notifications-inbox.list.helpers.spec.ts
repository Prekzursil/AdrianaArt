import { AccountNotificationsInboxComponent } from './account-notifications-inbox.component';

/** Golden WU notif-inbox-list — N=3 currentList / activeNotifications / hiddenNotifications. */
describe('AccountNotificationsInboxComponent list helpers (golden WU)', () => {
  function createCmp(): AccountNotificationsInboxComponent {
    const cmp = Object.create(
      AccountNotificationsInboxComponent.prototype,
    ) as AccountNotificationsInboxComponent;
    cmp.tab = 'inbox';
    cmp.items = [
      { id: '1', dismissed_at: null } as any,
      { id: '2', dismissed_at: '2026-01-01T00:00:00Z' } as any,
      { id: '3', dismissed_at: undefined } as any,
    ];
    return cmp;
  }

  it('activeNotifications keeps only non-dismissed items', () => {
    const cmp = createCmp();
    expect(cmp.activeNotifications().map((n) => n.id)).toEqual(['1', '3']);
  });

  it('hiddenNotifications keeps only dismissed items', () => {
    const cmp = createCmp();
    expect(cmp.hiddenNotifications().map((n) => n.id)).toEqual(['2']);
  });

  it('currentList switches between active and hidden by tab', () => {
    const cmp = createCmp();
    expect(cmp.currentList().map((n) => n.id)).toEqual(['1', '3']);
    cmp.tab = 'hidden';
    expect(cmp.currentList().map((n) => n.id)).toEqual(['2']);
  });
});
