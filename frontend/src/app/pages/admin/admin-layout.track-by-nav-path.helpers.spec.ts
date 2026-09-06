import { AdminLayoutComponent } from './admin-layout.component';

/** Golden WU admin-layout-track-by-nav-path — trackByNavPath. */
describe('AdminLayoutComponent trackByNavPath (golden WU)', () => {
  it('returns item.path', () => {
    const cmp = Object.create(AdminLayoutComponent.prototype) as AdminLayoutComponent;
    expect(cmp.trackByNavPath(0, { path: '/admin/orders' } as any)).toBe('/admin/orders');
  });
});
