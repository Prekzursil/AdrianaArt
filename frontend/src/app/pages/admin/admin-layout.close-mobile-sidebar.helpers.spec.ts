import { AdminLayoutComponent } from './admin-layout.component';

/** Golden WU admin-layout-close-mobile-sidebar — closeMobileSidebar. */
describe('AdminLayoutComponent closeMobileSidebar (golden WU)', () => {
  it('forces mobileSidebarOpen false', () => {
    const cmp = Object.create(AdminLayoutComponent.prototype) as AdminLayoutComponent;
    (cmp as any).mobileSidebarOpen = true;
    cmp.closeMobileSidebar();
    expect((cmp as any).mobileSidebarOpen).toBe(false);
  });
});
