import { ContactComponent } from './contact.component';

/** Golden WU contact-initials-focal-edit — initialsForLabel/focalPosition/canEditPage/editPage. */
describe('ContactComponent initials/focal/edit helpers (golden WU)', () => {
  function createCmp(overrides: Record<string, unknown> = {}) {
    const cmp = Object.create(ContactComponent.prototype) as ContactComponent;
    (cmp as any).storefrontAdminMode = { enabled: () => false };
    (cmp as any).router = { navigate: jasmine.createSpy('navigate') };
    Object.assign(cmp as any, overrides);
    return cmp;
  }

  it('initialsForLabel defaults and picks first/second graphemes', () => {
    const cmp = createCmp();
    expect(cmp.initialsForLabel('')).toBe('MS');
    expect(cmp.initialsForLabel('  Ada  ')).toBe('AD');
    expect(cmp.initialsForLabel('ada lovelace')).toBe('AL');
    expect(cmp.initialsForLabel('one two three')).toBe('OT');
  });

  it('focalPosition clamps and defaults to 50/50', () => {
    const cmp = createCmp();
    expect(cmp.focalPosition()).toBe('50% 50%');
    expect(cmp.focalPosition(10, 90)).toBe('10% 90%');
    expect(cmp.focalPosition(-5, 150)).toBe('0% 100%');
  });

  it('canEditPage mirrors storefrontAdminMode; editPage always navigates', () => {
    const anon = createCmp();
    expect(anon.canEditPage()).toBe(false);
    anon.editPage();
    expect((anon as any).router.navigate).toHaveBeenCalledWith(['/admin/content/pages'], {
      queryParams: { edit: 'contact' },
    });

    const admin = createCmp({ storefrontAdminMode: { enabled: () => true } });
    expect(admin.canEditPage()).toBe(true);
  });
});
