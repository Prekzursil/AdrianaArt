import { HeaderComponent } from './header.component';

/** Golden WU header-close-user-menu — closeUserMenu. */
describe('HeaderComponent closeUserMenu (golden WU)', () => {
  it('sets userMenuOpen false', () => {
    const cmp = Object.create(HeaderComponent.prototype) as HeaderComponent;
    Object.assign(cmp as any, { userMenuOpen: true });
    cmp.closeUserMenu();
    expect((cmp as any).userMenuOpen).toBe(false);
  });
});
