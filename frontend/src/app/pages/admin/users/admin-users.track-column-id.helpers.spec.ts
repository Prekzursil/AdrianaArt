import { AdminUsersComponent } from './admin-users.component';

/** Golden WU users-track-column-id — trackColumnId. */
describe('AdminUsersComponent trackColumnId (golden WU)', () => {
  it('returns the column id', () => {
    const cmp = Object.create(AdminUsersComponent.prototype) as AdminUsersComponent;
    expect(cmp.trackColumnId(0, 'email')).toBe('email');
    expect(cmp.trackColumnId(1, 'role')).toBe('role');
  });
});
