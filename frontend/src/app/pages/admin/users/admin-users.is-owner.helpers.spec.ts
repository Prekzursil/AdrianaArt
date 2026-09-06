import { AdminUsersComponent } from './admin-users.component';

/** Golden WU users-is-owner — isOwner. */
describe('AdminUsersComponent isOwner (golden WU)', () => {
  function bare(role: string | null): AdminUsersComponent {
    const cmp = Object.create(AdminUsersComponent.prototype) as AdminUsersComponent;
    Object.assign(cmp as any, { auth: { role: () => role } });
    return cmp;
  }

  it('is true only for owner role', () => {
    expect(bare('owner').isOwner()).toBe(true);
    expect(bare('admin').isOwner()).toBe(false);
    expect(bare(null).isOwner()).toBe(false);
  });
});
