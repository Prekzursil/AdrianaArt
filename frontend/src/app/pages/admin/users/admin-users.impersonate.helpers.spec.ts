import { AdminUsersComponent } from './admin-users.component';

/** Golden WU admin-users-impersonate -- impersonate. */
describe('AdminUsersComponent impersonate (golden WU)', () => {
  it('returns early when no user is selected', () => {
    const cmp = Object.create(AdminUsersComponent.prototype) as AdminUsersComponent;
    Object.assign(cmp as any, {
      selectedUser: jasmine.createSpy('user').and.returnValue(null),
      impersonateBusy: { set: jasmine.createSpy('busy') },
      usersApi: { impersonate: jasmine.createSpy('imp') },
    });
    cmp.impersonate();
    expect((cmp as any).impersonateBusy.set).not.toHaveBeenCalled();
  });
});
