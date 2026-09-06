import { AdminLayoutComponent } from './admin-layout.component';

/** Golden WU admin-layout-clear-nav-query — clearNavQuery. */
describe('AdminLayoutComponent clearNavQuery (golden WU)', () => {
  it('delegates empty string to onNavQueryChange', () => {
    const cmp = Object.create(AdminLayoutComponent.prototype) as AdminLayoutComponent;
    const calls: string[] = [];
    (cmp as any).onNavQueryChange = (v: string) => calls.push(v);
    cmp.clearNavQuery();
    expect(calls).toEqual(['']);
  });
});
