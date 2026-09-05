import { ContactComponent } from './contact.component';

/** Golden WU contact-initials-focal — N=3 initialsForLabel / focalPosition / canEditPage. */
describe('ContactComponent initials/focal/edit helpers (golden WU)', () => {
  function createCmp(enabled = false): ContactComponent {
    const cmp = Object.create(ContactComponent.prototype) as ContactComponent;
    (cmp as any).storefrontAdminMode = { enabled: () => enabled };
    return cmp;
  }

  it('initialsForLabel builds two-letter initials with MS fallback', () => {
    const cmp = createCmp();
    expect(cmp.initialsForLabel('')).toBe('MS');
    expect(cmp.initialsForLabel('   ')).toBe('MS');
    expect(cmp.initialsForLabel('Ada')).toBe('AD');
    expect(cmp.initialsForLabel('Ada Lovelace')).toBe('AL');
    expect(cmp.initialsForLabel('moment studio')).toBe('MS');
  });

  it('focalPosition clamps and formats percent coords', () => {
    const cmp = createCmp();
    expect(cmp.focalPosition()).toBe('50% 50%');
    expect(cmp.focalPosition(0, 100)).toBe('0% 100%');
    expect(cmp.focalPosition(-10, 150)).toBe('0% 100%');
    expect(cmp.focalPosition(33.6, 66.4)).toBe('34% 66%');
  });

  it('canEditPage mirrors storefrontAdminMode.enabled', () => {
    expect(createCmp(false).canEditPage()).toBe(false);
    expect(createCmp(true).canEditPage()).toBe(true);
  });
});
