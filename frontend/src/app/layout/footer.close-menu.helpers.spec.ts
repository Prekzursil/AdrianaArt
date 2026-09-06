import { FooterComponent } from './footer.component';

/** Golden WU footer-close-menu — closeMenu. */
describe('FooterComponent closeMenu (golden WU)', () => {
  it('clears openMenu', () => {
    const cmp = Object.create(FooterComponent.prototype) as FooterComponent;
    Object.assign(cmp as any, { openMenu: 'instagram' });
    cmp.closeMenu();
    expect((cmp as any).openMenu).toBeNull();
  });
});
