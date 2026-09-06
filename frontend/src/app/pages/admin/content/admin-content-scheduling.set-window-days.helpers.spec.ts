import { AdminContentSchedulingComponent } from './admin-content-scheduling.component';

/** Golden WU content-scheduling-set-window-days — setWindowDays. */
describe('AdminContentSchedulingComponent setWindowDays (golden WU)', () => {
  it('clamps window days and reloads from page 1', () => {
    const cmp = Object.create(AdminContentSchedulingComponent.prototype) as AdminContentSchedulingComponent;
    let loads = 0;
    const windowDays = { set: (v: number) => ((cmp as any)._wd = v) };
    const page = { set: (v: number) => ((cmp as any)._page = v) };
    Object.assign(cmp as any, {
      windowDays,
      page,
      load: () => {
        loads += 1;
      },
    });
    cmp.setWindowDays(30);
    expect((cmp as any)._wd).toBe(30);
    expect((cmp as any)._page).toBe(1);
    expect(loads).toBe(1);
    cmp.setWindowDays(45 as any);
    expect((cmp as any)._wd).toBe(90);
    expect(loads).toBe(2);
  });
});
