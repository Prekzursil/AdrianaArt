import { FooterComponent } from './footer.component';

/** Golden WU footer-toggle-menu — toggleMenu. */
describe('FooterComponent toggleMenu (golden WU)', () => {
  it('toggles openMenu between social menus and null', () => {
    const cmp = Object.create(FooterComponent.prototype) as FooterComponent;
    Object.assign(cmp as any, { openMenu: null });
    cmp.toggleMenu('instagram');
    expect((cmp as any).openMenu).toBe('instagram');
    cmp.toggleMenu('instagram');
    expect((cmp as any).openMenu).toBeNull();
    cmp.toggleMenu('facebook');
    expect((cmp as any).openMenu).toBe('facebook');
  });
});
