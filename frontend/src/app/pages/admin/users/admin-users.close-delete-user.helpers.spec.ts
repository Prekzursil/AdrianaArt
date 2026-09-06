import { AdminUsersComponent } from './admin-users.component';

/** Golden WU users-close-delete-user -- closeDeleteUser. */
describe('AdminUsersComponent closeDeleteUser (golden WU)', () => {
  it('clears delete-user modal state', () => {
    const cmp = Object.create(AdminUsersComponent.prototype) as AdminUsersComponent;
    Object.assign(cmp as any, {
      deleteUserOpen: { set: jasmine.createSpy('open') },
      deleteUserBusy: { set: jasmine.createSpy('busy') },
      deleteUserError: { set: jasmine.createSpy('error') },
      deleteUserPassword: 'pw',
      deleteUserConfirm: 'yes',
    });
    cmp.closeDeleteUser();
    expect((cmp as any).deleteUserOpen.set).toHaveBeenCalledWith(false);
    expect((cmp as any).deleteUserBusy.set).toHaveBeenCalledWith(false);
    expect((cmp as any).deleteUserError.set).toHaveBeenCalledWith(null);
    expect((cmp as any).deleteUserPassword).toBe('');
    expect((cmp as any).deleteUserConfirm).toBe('');
  });
});
