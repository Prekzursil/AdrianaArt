import { AdminLayoutComponent } from './admin-layout.component';

/** Golden WU admin-layout-handle-nav-selection — handleNavSelection. */
describe('AdminLayoutComponent handleNavSelection (golden WU)', () => {
  it('closes mobile sidebar only when not desktop', () => {
    const cmp = Object.create(AdminLayoutComponent.prototype) as AdminLayoutComponent;
    (cmp as any).isDesktop = true;
    (cmp as any).mobileSidebarOpen = true;
    cmp.handleNavSelection();
    expect((cmp as any).mobileSidebarOpen).toBe(true);
    (cmp as any).isDesktop = false;
    cmp.handleNavSelection();
    expect((cmp as any).mobileSidebarOpen).toBe(false);
  });
});
