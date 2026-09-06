import { AdminDashboardComponent } from './admin-dashboard.component';

/** Golden WU dashboard-is-owner — isOwner. */
describe('AdminDashboardComponent isOwner (golden WU)', () => {
  function bare(role: string): AdminDashboardComponent {
    const cmp = Object.create(AdminDashboardComponent.prototype) as AdminDashboardComponent;
    Object.assign(cmp as any, { auth: { role: () => role } });
    return cmp;
  }

  it('is true only for owner role', () => {
    expect(bare('owner').isOwner()).toBe(true);
    expect(bare('admin').isOwner()).toBe(false);
    expect(bare('staff').isOwner()).toBe(false);
  });
});
