import { AdminLayoutComponent } from './admin-layout.component';

/** Golden WU layout-favorite-key — favoriteKey. */
describe('AdminLayoutComponent favoriteKey (golden WU)', () => {
  it('prefixes path with page:', () => {
    const cmp = Object.create(AdminLayoutComponent.prototype) as any;
    expect(cmp.favoriteKey({ path: '/admin/dashboard' })).toBe('page:/admin/dashboard');
  });
});
