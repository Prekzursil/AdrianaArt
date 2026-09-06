import { AccountNotificationsInboxComponent } from './account-notifications-inbox.component';

/** Golden WU account-notifications-lists — active/hidden/current lists. */
describe('AccountNotificationsInboxComponent list helpers (golden WU)', () => {
  function createCmp(tab: 'active' | 'hidden', items: Array<{ id: string; dismissed_at?: string | null }>) {
    const cmp = Object.create(
      AccountNotificationsInboxComponent.prototype,
    ) as AccountNotificationsInboxComponent;
    (cmp as any).tab = tab;
    (cmp as any).items = items;
    return cmp;
  }

  it('splits active vs hidden and currentList follows tab', () => {
    const items = [
      { id: '1', dismissed_at: null },
      { id: '2', dismissed_at: '2026-01-01T00:00:00Z' },
      { id: '3' },
    ];
    const active = createCmp('active', items);
    expect(active.activeNotifications().map((n) => n.id)).toEqual(['1', '3']);
    expect(active.hiddenNotifications().map((n) => n.id)).toEqual(['2']);
    expect(active.currentList().map((n) => n.id)).toEqual(['1', '3']);
    expect(createCmp('hidden', items).currentList().map((n) => n.id)).toEqual(['2']);
  });
});
