import { AccountAddressesComponent } from './account-addresses.component';

/** Golden WU addresses-has-unsaved-changes — hasUnsavedChanges. */
describe('AccountAddressesComponent hasUnsavedChanges (golden WU)', () => {
  it('delegates to account.addressesHasUnsavedChanges', () => {
    const cmp = Object.create(AccountAddressesComponent.prototype) as AccountAddressesComponent;
    Object.assign(cmp as any, {
      account: { addressesHasUnsavedChanges: () => true },
    });
    expect(cmp.hasUnsavedChanges()).toBe(true);
    (cmp as any).account = { addressesHasUnsavedChanges: () => false };
    expect(cmp.hasUnsavedChanges()).toBe(false);
  });
});
