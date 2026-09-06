import { AdminUsersComponent } from './admin-users.component';

/** Golden WU admin-users-open-delete-user -- openDeleteUser. */
describe('AdminUsersComponent openDeleteUser (golden WU)', () => {
  it('returns early when no user selected', () => {
    const cmp = Object.create(AdminUsersComponent.prototype) as AdminUsersComponent;
    Object.assign(cmp as any, {
      selectedUser: jasmine.createSpy('user').and.returnValue(null),
      deleteUserOpen: { set: jasmine.createSpy('open') },
    });
    cmp.openDeleteUser();
    expect((cmp as any).deleteUserOpen.set).not.toHaveBeenCalled();
  });
});
