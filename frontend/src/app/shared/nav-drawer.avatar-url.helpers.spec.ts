import { NavDrawerComponent } from './nav-drawer.component';

/** Golden WU nav-drawer-avatar-url — avatarUrl. */
describe('NavDrawerComponent avatarUrl (golden WU)', () => {
  it('returns avatar_url or null', () => {
    const cmp = Object.create(NavDrawerComponent.prototype) as NavDrawerComponent;
    Object.assign(cmp as any, { user: null });
    expect(cmp.avatarUrl()).toBeNull();
    Object.assign(cmp as any, { user: { avatar_url: '/a.png' } });
    expect(cmp.avatarUrl()).toBe('/a.png');
    Object.assign(cmp as any, { user: { avatar_url: '' } });
    expect(cmp.avatarUrl()).toBeNull();
  });
});
