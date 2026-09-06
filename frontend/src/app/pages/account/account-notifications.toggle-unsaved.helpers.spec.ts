import { AccountNotificationsComponent } from './account-notifications.component';

/** Golden WU — togglePreview + unsaved-change helpers. */
describe('AccountNotificationsComponent toggle/unsaved helpers (golden WU)', () => {
  function bare(overrides: Record<string, unknown> = {}): AccountNotificationsComponent {
    const cmp = Object.create(AccountNotificationsComponent.prototype) as AccountNotificationsComponent;
    Object.assign(cmp as any, {
      preview: null as 'reply' | 'admin' | 'marketing' | null,
      account: {
        notificationsHasUnsavedChanges: jasmine.createSpy('unsaved').and.returnValue(false),
        discardNotificationChanges: jasmine.createSpy('discard'),
      },
      ...overrides,
    });
    return cmp;
  }

  it('togglePreview toggles same key off and switches keys', () => {
    const cmp = bare();
    cmp.togglePreview('reply');
    expect(cmp.preview).toBe('reply');
    cmp.togglePreview('reply');
    expect(cmp.preview).toBeNull();
    cmp.togglePreview('admin');
    expect(cmp.preview).toBe('admin');
    cmp.togglePreview('marketing');
    expect(cmp.preview).toBe('marketing');
  });

  it('hasUnsavedChanges / discardUnsavedChanges delegate to account', () => {
    const cmp = bare();
    expect(cmp.hasUnsavedChanges()).toBe(false);
    (cmp as any).account.notificationsHasUnsavedChanges.and.returnValue(true);
    expect(cmp.hasUnsavedChanges()).toBe(true);
    cmp.discardUnsavedChanges();
    expect((cmp as any).account.discardNotificationChanges).toHaveBeenCalled();
  });
});
