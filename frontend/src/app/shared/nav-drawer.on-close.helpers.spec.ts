import { NavDrawerComponent } from './nav-drawer.component';

/** Golden WU nav-drawer-on-close — onClose. */
describe('NavDrawerComponent onClose (golden WU)', () => {
  it('emits closed', () => {
    const cmp = Object.create(NavDrawerComponent.prototype) as NavDrawerComponent;
    let emits = 0;
    Object.assign(cmp as any, { closed: { emit: () => { emits += 1; } } });
    cmp.onClose();
    expect(emits).toBe(1);
  });
});
