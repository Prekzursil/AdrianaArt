import { AdminUsersComponent } from './admin-users.component';

/** Golden WU users-role-pill-class — rolePillClass. */
describe('AdminUsersComponent rolePillClass (golden WU)', () => {
  it('maps known roles and defaults unknown', () => {
    const cmp = Object.create(AdminUsersComponent.prototype) as AdminUsersComponent;
    expect(cmp.rolePillClass('owner')).toContain('indigo');
    expect(cmp.rolePillClass('admin')).toContain('emerald');
    expect(cmp.rolePillClass('support')).toContain('sky');
    expect(cmp.rolePillClass('fulfillment')).toContain('amber');
    expect(cmp.rolePillClass('content')).toContain('fuchsia');
    expect(cmp.rolePillClass('guest')).toContain('slate');
  });
});
