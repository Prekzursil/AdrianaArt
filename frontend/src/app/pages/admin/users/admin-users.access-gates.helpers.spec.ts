import { AdminUsersComponent } from './admin-users.component';

/** Golden WU users-access-gates-helpers. */
describe('AdminUsersComponent access gate helpers (golden WU)', () => {
  function bare(overrides: Record<string, unknown> = {}): AdminUsersComponent {
    const cmp = Object.create(AdminUsersComponent.prototype) as AdminUsersComponent;
    Object.assign(cmp as any, {
      profile: () => ({ user: { locked_until: null } }),
      auth: {
        role: () => 'admin',
        isAdmin: () => true,
        canAccessAdminSection: jasmine.createSpy('canAccessAdminSection').and.returnValue(true),
      },
      ...overrides,
    });
    return cmp;
  }

  it('isLocked is true only when locked_until is in the future', () => {
    expect(bare().isLocked()).toBe(false);
    expect(
      bare({
        profile: () => ({ user: { locked_until: new Date(Date.now() + 60_000).toISOString() } }),
      }).isLocked(),
    ).toBe(true);
    expect(
      bare({
        profile: () => ({ user: { locked_until: new Date(Date.now() - 60_000).toISOString() } }),
      }).isLocked(),
    ).toBe(false);
  });

  it('isOwner / canManageRoles / canIssueCoupons / canRevealPii gate on auth', () => {
    expect(bare().isOwner()).toBe(false);
    expect(bare({ auth: { role: () => 'owner', isAdmin: () => true, canAccessAdminSection: () => true } }).isOwner()).toBe(
      true,
    );
    expect(bare({ auth: { role: () => 'admin', isAdmin: () => false, canAccessAdminSection: () => false } }).canManageRoles()).toBe(
      false,
    );
    const issue = bare({
      auth: {
        role: () => 'admin',
        isAdmin: () => true,
        canAccessAdminSection: jasmine.createSpy('canAccessAdminSection').and.returnValue(false),
      },
    });
    expect(issue.canIssueCoupons()).toBe(false);
    expect((issue as any).auth.canAccessAdminSection).toHaveBeenCalledWith('coupons');
    expect(
      bare({ auth: { role: () => 'support', isAdmin: () => false, canAccessAdminSection: () => false } }).canRevealPii(),
    ).toBe(true);
    expect(
      bare({ auth: { role: () => 'customer', isAdmin: () => false, canAccessAdminSection: () => false } }).canRevealPii(),
    ).toBe(false);
  });
});
