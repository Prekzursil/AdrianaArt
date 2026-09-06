import { NavDrawerComponent } from './nav-drawer.component';

/** Golden WU nav-drawer-avatar-src — avatarSrc. */
describe('NavDrawerComponent avatarSrc (golden WU)', () => {
  it('falls back to placeholder when avatar missing', () => {
    const cmp = Object.create(NavDrawerComponent.prototype) as NavDrawerComponent;
    (cmp as any).placeholderAvatar = 'assets/placeholder/avatar-placeholder.svg';
    (cmp as any).user = null;
    expect(cmp.avatarSrc()).toBe('assets/placeholder/avatar-placeholder.svg');
    (cmp as any).user = { username: 'x', avatar_url: 'https://cdn/a.png' };
    expect(cmp.avatarSrc()).toBe('https://cdn/a.png');
  });
});
