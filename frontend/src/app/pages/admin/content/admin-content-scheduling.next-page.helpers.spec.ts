import { AdminContentSchedulingComponent } from './admin-content-scheduling.component';

/** Golden WU content-scheduling-next-page — nextPage. */
describe('AdminContentSchedulingComponent nextPage (golden WU)', () => {
  it('increments page only when below total', () => {
    const cmp = Object.create(AdminContentSchedulingComponent.prototype) as AdminContentSchedulingComponent;
    let loads = 0;
    let pageVal = 3;
    Object.assign(cmp as any, {
      page: Object.assign(() => pageVal, {
        set: (v: number) => {
          pageVal = v;
        },
      }),
      meta: () => ({ total_pages: 3 }),
      load: () => {
        loads += 1;
      },
    });
    cmp.nextPage();
    expect(pageVal).toBe(3);
    expect(loads).toBe(0);
    Object.assign(cmp as any, { meta: () => ({ total_pages: 5 }) });
    pageVal = 2;
    cmp.nextPage();
    expect(pageVal).toBe(3);
    expect(loads).toBe(1);
  });
});
