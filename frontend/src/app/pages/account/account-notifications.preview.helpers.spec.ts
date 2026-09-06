import { AccountNotificationsComponent } from './account-notifications.component';

/** Golden WU account-notifications-preview-helpers. */
describe('AccountNotificationsComponent preview helpers (golden WU)', () => {
  function bare(overrides: Record<string, unknown> = {}): AccountNotificationsComponent {
    const cmp = Object.create(AccountNotificationsComponent.prototype) as AccountNotificationsComponent;
    Object.assign(cmp as any, {
      preview: null,
      account: { notificationsHasUnsavedChanges: () => true },
      ...overrides,
    });
    return cmp;
  }

  it('togglePreview toggles or clears key', () => {
    const cmp = bare();
    cmp.togglePreview('reply');
    expect((cmp as any).preview).toBe('reply');
    cmp.togglePreview('reply');
    expect((cmp as any).preview).toBeNull();
  });

  it('hasUnsavedChanges delegates to account', () => {
    expect(bare().hasUnsavedChanges()).toBe(true);
    expect(
      bare({ account: { notificationsHasUnsavedChanges: () => false } }).hasUnsavedChanges(),
    ).toBe(false);
  });
});
