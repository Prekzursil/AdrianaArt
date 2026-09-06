import { AdminUsersComponent } from './admin-users.component';

/** Golden WU admin-users-force-logout -- forceLogout. */
describe('AdminUsersComponent forceLogout (golden WU)', () => {
  it('returns early when no user is selected', () => {
    const cmp = Object.create(AdminUsersComponent.prototype) as AdminUsersComponent;
    Object.assign(cmp as any, {
      selectedUser: jasmine.createSpy('user').and.returnValue(null),
      admin: { revokeSessions: jasmine.createSpy('revoke') },
    });
    cmp.forceLogout();
    expect((cmp as any).admin.revokeSessions).not.toHaveBeenCalled();
  });
});
