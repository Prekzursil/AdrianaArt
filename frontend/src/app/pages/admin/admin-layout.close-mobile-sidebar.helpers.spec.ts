import { AdminLayoutComponent } from './admin-layout.component';

/** Golden WU layout-close-mobile-sidebar -- closeMobileSidebar. */
describe('AdminLayoutComponent closeMobileSidebar (golden WU)', () => {
  it('sets mobileSidebarOpen false', () => {
    const cmp = Object.create(AdminLayoutComponent.prototype) as AdminLayoutComponent;
    Object.assign(cmp as any, { mobileSidebarOpen: true });
    cmp.closeMobileSidebar();
    expect((cmp as any).mobileSidebarOpen).toBe(false);
  });
});
