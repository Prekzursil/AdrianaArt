import { HeaderComponent } from './header.component';

/** Golden WU header-track-nav-link — trackNavLink. */
describe('HeaderComponent trackNavLink (golden WU)', () => {
  it('joins path and label', () => {
    const cmp = Object.create(HeaderComponent.prototype) as HeaderComponent;
    expect(cmp.trackNavLink(0, { path: '/shop', label: 'Shop' } as any)).toBe('/shop|Shop');
    expect(cmp.trackNavLink(1, { path: ' /a ', label: ' A ' } as any)).toBe('/a|A');
  });
});
