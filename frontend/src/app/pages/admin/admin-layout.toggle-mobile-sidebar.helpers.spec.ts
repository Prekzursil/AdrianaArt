import { AdminLayoutComponent } from './admin-layout.component';

/** Golden WU admin-layout-toggle-mobile-sidebar — toggleMobileSidebar. */
describe('AdminLayoutComponent toggleMobileSidebar (golden WU)', () => {
  it('no-ops on desktop; toggles on mobile', () => {
    const cmp = Object.create(AdminLayoutComponent.prototype) as AdminLayoutComponent;
    (cmp as any).isDesktop = true;
    (cmp as any).mobileSidebarOpen = false;
    cmp.toggleMobileSidebar();
    expect((cmp as any).mobileSidebarOpen).toBe(false);
    (cmp as any).isDesktop = false;
    cmp.toggleMobileSidebar();
    expect((cmp as any).mobileSidebarOpen).toBe(true);
    cmp.toggleMobileSidebar();
    expect((cmp as any).mobileSidebarOpen).toBe(false);
  });
});
