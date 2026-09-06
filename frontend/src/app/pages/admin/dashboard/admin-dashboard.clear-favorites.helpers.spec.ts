import { AdminDashboardComponent } from './admin-dashboard.component';

/** Golden WU dashboard-clear-favorites — clearFavorites. */
describe('AdminDashboardComponent clearFavorites (golden WU)', () => {
  it('delegates to favorites.clear', () => {
    const cmp = Object.create(AdminDashboardComponent.prototype) as AdminDashboardComponent;
    let cleared = 0;
    Object.assign(cmp as any, { favorites: { clear: () => { cleared += 1; } } });
    cmp.clearFavorites();
    expect(cleared).toBe(1);
  });
});
