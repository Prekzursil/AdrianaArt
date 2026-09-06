import { AccountNotificationsComponent } from './account-notifications.component';

/** Golden WU account-notifications-toggle-preview — togglePreview. */
describe('AccountNotificationsComponent togglePreview (golden WU)', () => {
  it('toggles preview key and clears when same key reselected', () => {
    const cmp = Object.create(AccountNotificationsComponent.prototype) as AccountNotificationsComponent;
    (cmp as any).preview = null;
    cmp.togglePreview('reply');
    expect((cmp as any).preview).toBe('reply');
    cmp.togglePreview('reply');
    expect((cmp as any).preview).toBeNull();
    cmp.togglePreview('marketing');
    expect((cmp as any).preview).toBe('marketing');
  });
});
