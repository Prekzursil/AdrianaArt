import { ContactComponent } from './contact.component';

describe('ContactComponent canEditPage/editPage (golden WU)', () => {
  it('canEditPage mirrors storefrontAdminMode.enabled', () => {
    const cmp = Object.create(ContactComponent.prototype) as ContactComponent;
    (cmp as any).storefrontAdminMode = { enabled: () => true };
    expect(cmp.canEditPage()).toBe(true);
    (cmp as any).storefrontAdminMode = { enabled: () => false };
    expect(cmp.canEditPage()).toBe(false);
  });

  it('editPage navigates to contact page editor', () => {
    const cmp = Object.create(ContactComponent.prototype) as ContactComponent;
    const navigate = jasmine.createSpy('navigate').and.resolveTo(true);
    (cmp as any).router = { navigate };
    cmp.editPage();
    expect(navigate).toHaveBeenCalledWith(['/admin/content/pages'], {
      queryParams: { edit: 'contact' },
    });
  });
});
