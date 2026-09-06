import { AdminUsersComponent } from './admin-users.component';

/** Golden WU admin-users-confirm-delete-user -- confirmDeleteUser. */
describe('AdminUsersComponent confirmDeleteUser (golden WU)', () => {
  it('returns early for owner role', () => {
    const cmp = Object.create(AdminUsersComponent.prototype) as AdminUsersComponent;
    Object.assign(cmp as any, {
      selectedUser: jasmine.createSpy('user').and.returnValue({ id: 'u1', role: 'owner' }),
      deleteUserBusy: { set: jasmine.createSpy('busy') },
      usersApi: { executeGdprDeletion: jasmine.createSpy('del') },
    });
    cmp.confirmDeleteUser();
    expect((cmp as any).usersApi.executeGdprDeletion).not.toHaveBeenCalled();
    expect((cmp as any).deleteUserBusy.set).not.toHaveBeenCalled();
  });
});
