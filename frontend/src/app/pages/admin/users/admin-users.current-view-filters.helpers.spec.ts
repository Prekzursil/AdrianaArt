import { AdminUsersComponent } from './admin-users.component';

/** Golden WU users-current-view-filters — currentViewFilters. */
describe('AdminUsersComponent currentViewFilters (golden WU)', () => {
  it('snapshots q/role/limit', () => {
    const cmp = Object.create(AdminUsersComponent.prototype) as AdminUsersComponent;
    (cmp as any).q = 'ana';
    (cmp as any).role = 'admin';
    (cmp as any).limit = 50;
    const fn = (AdminUsersComponent.prototype as any).currentViewFilters as (
      this: AdminUsersComponent,
    ) => { q: string; role: string; limit: number };
    expect(fn.call(cmp)).toEqual({ q: 'ana', role: 'admin', limit: 50 });
  });
});
