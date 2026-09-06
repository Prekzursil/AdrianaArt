import { AdminReturnsComponent } from './admin-returns.component';

/** Golden WU returns-crumbs — crumbs. */
describe('AdminReturnsComponent crumbs (golden WU)', () => {
  it('returns home / admin / returns trail', () => {
    const cmp = Object.create(AdminReturnsComponent.prototype) as AdminReturnsComponent;
    expect(cmp.crumbs()).toEqual([
      { label: 'nav.home', url: '/' },
      { label: 'nav.admin', url: '/admin/dashboard' },
      { label: 'adminUi.returns.title' },
    ]);
  });
});
