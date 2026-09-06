import { AdminOpsComponent } from './admin-ops.component';

/** Golden WU admin-ops-crumbs — crumbs. */
describe('AdminOpsComponent crumbs (golden WU)', () => {
  it('returns home/admin/ops breadcrumb trail', () => {
    const cmp = Object.create(AdminOpsComponent.prototype) as AdminOpsComponent;
    expect(cmp.crumbs()).toEqual([
      { label: 'nav.home', url: '/' },
      { label: 'nav.admin', url: '/admin/dashboard' },
      { label: 'adminUi.nav.ops' },
    ]);
  });
});
