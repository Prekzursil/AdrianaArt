import { AccountNotificationsInboxComponent } from './account-notifications-inbox.component';

/** Golden WU account-inbox-mark-read-helpers. */
describe('AccountNotificationsInboxComponent currentList (golden WU)', () => {
  function bare(tab: string): AccountNotificationsInboxComponent {
    const cmp = Object.create(AccountNotificationsInboxComponent.prototype) as AccountNotificationsInboxComponent;
    Object.assign(cmp as any, {
      tab,
      hiddenNotifications: () => [{ id: 'h' }],
      activeNotifications: () => [{ id: 'a' }],
    });
    return cmp;
  }

  it('currentList switches by tab', () => {
    expect(bare('hidden').currentList().map((n: any) => n.id)).toEqual(['h']);
    expect(bare('active').currentList().map((n: any) => n.id)).toEqual(['a']);
  });
});
