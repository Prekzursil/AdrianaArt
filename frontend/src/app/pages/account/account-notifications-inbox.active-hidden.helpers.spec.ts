import { AccountNotificationsInboxComponent } from './account-notifications-inbox.component';

/** Golden WU account-notifications-active-hidden — active/hidden/currentList. */
describe('AccountNotificationsInboxComponent notification filters (golden WU)', () => {
  function make(items: any[], tab: 'active' | 'hidden' = 'active') {
    const cmp = Object.create(
      AccountNotificationsInboxComponent.prototype,
    ) as AccountNotificationsInboxComponent;
    (cmp as any).items = items;
    (cmp as any).tab = tab;
    return cmp;
  }
  it('splits active vs hidden and respects tab for currentList', () => {
    const items = [
      { id: '1', dismissed_at: null },
      { id: '2', dismissed_at: '2026-01-01' },
      { id: '3', dismissed_at: '' },
    ];
    const cmp = make(items, 'active');
    expect(cmp.activeNotifications().map((n: any) => n.id)).toEqual(['1', '3']);
    expect(cmp.hiddenNotifications().map((n: any) => n.id)).toEqual(['2']);
    expect(cmp.currentList().map((n: any) => n.id)).toEqual(['1', '3']);
    (cmp as any).tab = 'hidden';
    expect(cmp.currentList().map((n: any) => n.id)).toEqual(['2']);
  });
});
