import { AccountAddressesComponent } from './account-addresses.component';

/** Golden WU account-addresses-has-unsaved-changes -- hasUnsavedChanges. */
describe('AccountAddressesComponent hasUnsavedChanges (golden WU)', () => {
  it('returns early on guard', () => {
    const cmp = Object.create(AccountAddressesComponent.prototype) as AccountAddressesComponent;
    Object.assign(cmp as any, {
      toast: { error: jasmine.createSpy('e'), success: jasmine.createSpy('s') },
      t: (k: string) => k,
      load: jasmine.createSpy('load'),
      save: jasmine.createSpy('save'),
      form: {},
      draft: jasmine.createSpy('draft').and.returnValue(null),
      original: jasmine.createSpy('original').and.returnValue(null),
      selectedIds: jasmine.createSpy('selectedIds').and.returnValue(new Set()),
      items: jasmine.createSpy('items').and.returnValue([]),
      notifications: jasmine.createSpy('notifications').and.returnValue([]),
      filter: jasmine.createSpy('filter').and.returnValue('all'),
      page: jasmine.createSpy('page').and.returnValue(1),
      busy: jasmine.createSpy('busy').and.returnValue(false),
      theme: { setPreference: jasmine.createSpy('sp') },
      documentClick: jasmine.createSpy('dc'),
    });
    expect(() => (cmp as any).hasUnsavedChanges()).not.toThrow();
  });
});
