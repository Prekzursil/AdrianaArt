import { AdminComponent } from './admin.component';

/** Golden WU admin-can-rename-page-key — canRenamePageKey. */
describe('AdminComponent canRenamePageKey (golden WU)', () => {
  it('allows custom page.* keys and blocks reserved pages', () => {
    const cmp = Object.create(AdminComponent.prototype) as AdminComponent;
    expect(cmp.canRenamePageKey('page.custom-landing')).toBe(true);
    expect(cmp.canRenamePageKey('page.about')).toBe(false);
    expect(cmp.canRenamePageKey('page.contact')).toBe(false);
    expect(cmp.canRenamePageKey('page.faq')).toBe(false);
    expect(cmp.canRenamePageKey('page.shipping')).toBe(false);
    expect(cmp.canRenamePageKey('home.sections')).toBe(false);
    expect(cmp.canRenamePageKey('')).toBe(false);
  });
});
