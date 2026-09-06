import { AdminContentSchedulingComponent } from './admin-content-scheduling.component';

/** Golden WU content-scheduling-prev-page — prevPage. */
describe('AdminContentSchedulingComponent prevPage (golden WU)', () => {
  it('decrements page only when above one', () => {
    const cmp = Object.create(AdminContentSchedulingComponent.prototype) as AdminContentSchedulingComponent;
    let loads = 0;
    let pageVal = 1;
    Object.assign(cmp as any, {
      page: () => pageVal,
      pageSet: (v: number) => {
        pageVal = v;
      },
      load: () => {
        loads += 1;
      },
    });
    (cmp as any).page.set = (v: number) => {
      pageVal = v;
    };
    Object.assign(cmp as any, {
      page: Object.assign(() => pageVal, {
        set: (v: number) => {
          pageVal = v;
        },
      }),
    });
    cmp.prevPage();
    expect(pageVal).toBe(1);
    expect(loads).toBe(0);
    pageVal = 3;
    cmp.prevPage();
    expect(pageVal).toBe(2);
    expect(loads).toBe(1);
  });
});
