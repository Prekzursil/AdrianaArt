import { AccountProfileComponent } from './account-profile.component';

describe('AccountProfileComponent hasUnsavedChanges (golden WU)', () => {
  it('delegates to account.profileHasUnsavedChanges', () => {
    const cmp = Object.create(AccountProfileComponent.prototype) as any;
    cmp.account = { profileHasUnsavedChanges: () => true };
    expect(cmp.hasUnsavedChanges()).toBe(true);
    cmp.account = { profileHasUnsavedChanges: () => false };
    expect(cmp.hasUnsavedChanges()).toBe(false);
  });
});
