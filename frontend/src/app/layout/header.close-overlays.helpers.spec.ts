import { HeaderComponent } from './header.component';

/** Golden WU header-close-overlays — closeOverlays. */
describe('HeaderComponent closeOverlays (golden WU)', () => {
  it('closes user menu and notifications', () => {
    const cmp = Object.create(HeaderComponent.prototype) as HeaderComponent;
    Object.assign(cmp as any, { userMenuOpen: true, notificationsOpen: true });
    cmp.closeOverlays();
    expect((cmp as any).userMenuOpen).toBe(false);
    expect((cmp as any).notificationsOpen).toBe(false);
  });
});
