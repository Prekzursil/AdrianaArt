import { NavDrawerComponent } from './nav-drawer.component';

/** Golden WU nav-drawer-display-name — displayName. */
describe('NavDrawerComponent displayName (golden WU)', () => {
  it('formats the drawer identity label', () => {
    const cmp = Object.create(NavDrawerComponent.prototype) as NavDrawerComponent;
    (cmp as any).user = { name: 'Ada', username: 'ada', name_tag: 1, email: 'a@b.c' };
    expect(cmp.displayName()).toContain('Ada');
    (cmp as any).user = null;
    expect(cmp.displayName()).toBe('');
  });
});
