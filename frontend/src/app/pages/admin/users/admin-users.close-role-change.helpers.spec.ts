import { AdminUsersComponent } from './admin-users.component';

/** Golden WU users-close-role-change -- closeRoleChange. */
describe('AdminUsersComponent closeRoleChange (golden WU)', () => {
  it('clears role-change modal state', () => {
    const cmp = Object.create(AdminUsersComponent.prototype) as AdminUsersComponent;
    Object.assign(cmp as any, {
      roleChangeOpen: { set: jasmine.createSpy('open') },
      roleChangeBusy: { set: jasmine.createSpy('busy') },
      roleChangeError: { set: jasmine.createSpy('error') },
      roleChangePassword: 'secret',
    });
    cmp.closeRoleChange();
    expect((cmp as any).roleChangeOpen.set).toHaveBeenCalledWith(false);
    expect((cmp as any).roleChangeBusy.set).toHaveBeenCalledWith(false);
    expect((cmp as any).roleChangeError.set).toHaveBeenCalledWith(null);
    expect((cmp as any).roleChangePassword).toBe('');
  });
});
