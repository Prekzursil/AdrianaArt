import { AccountProfileComponent } from './account-profile.component';

/** Golden WU account-profile-unsaved-helpers. */
describe('AccountProfileComponent unsaved helpers (golden WU)', () => {
  function bare(overrides: Record<string, unknown> = {}): AccountProfileComponent {
    const cmp = Object.create(AccountProfileComponent.prototype) as AccountProfileComponent;
    Object.assign(cmp as any, {
      account: {
        profileHasUnsavedChanges: jasmine.createSpy('profileHasUnsavedChanges').and.returnValue(false),
        discardProfileChanges: jasmine.createSpy('discardProfileChanges'),
      },
      ...overrides,
    });
    return cmp;
  }

  it('hasUnsavedChanges delegates to account.profileHasUnsavedChanges', () => {
    const cmp = bare({
      account: {
        profileHasUnsavedChanges: jasmine.createSpy('profileHasUnsavedChanges').and.returnValue(true),
        discardProfileChanges: jasmine.createSpy('discardProfileChanges'),
      },
    });
    expect(cmp.hasUnsavedChanges()).toBe(true);
    expect((cmp as any).account.profileHasUnsavedChanges).toHaveBeenCalled();
  });

  it('discardUnsavedChanges delegates to account.discardProfileChanges', () => {
    const cmp = bare();
    cmp.discardUnsavedChanges();
    expect((cmp as any).account.discardProfileChanges).toHaveBeenCalled();
  });
});
