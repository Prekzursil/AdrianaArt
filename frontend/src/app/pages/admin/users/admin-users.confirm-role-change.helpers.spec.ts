import { AdminUsersComponent } from './admin-users.component';

/** Golden WU admin-users-confirm-role-change -- confirmRoleChange. */
describe('AdminUsersComponent confirmRoleChange (golden WU)', () => {
  it('returns early when no user is selected', () => {
    const cmp = Object.create(AdminUsersComponent.prototype) as AdminUsersComponent;
    Object.assign(cmp as any, {
      selectedUser: jasmine.createSpy('user').and.returnValue(null),
      roleChangeBusy: { set: jasmine.createSpy('busy') },
      closeRoleChange: jasmine.createSpy('close'),
    });
    cmp.confirmRoleChange();
    expect((cmp as any).roleChangeBusy.set).not.toHaveBeenCalled();
  });
});
