import { HeaderComponent } from './header.component';

/** Golden WU header-toggle-drawer — toggleDrawer. */
describe('HeaderComponent toggleDrawer (golden WU)', () => {
  it('opens drawer and closes other overlays', () => {
    const cmp = Object.create(HeaderComponent.prototype) as HeaderComponent;
    Object.assign(cmp as any, {
      drawerOpen: false,
      searchOpen: true,
      userMenuOpen: true,
      notificationsOpen: true,
    });
    cmp.toggleDrawer();
    expect((cmp as any).drawerOpen).toBe(true);
    expect((cmp as any).searchOpen).toBe(false);
    expect((cmp as any).userMenuOpen).toBe(false);
    expect((cmp as any).notificationsOpen).toBe(false);
    cmp.toggleDrawer();
    expect((cmp as any).drawerOpen).toBe(false);
  });
});
