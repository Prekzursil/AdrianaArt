import { signal } from '@angular/core';
import { AdminContentSchedulingComponent } from './admin-content-scheduling.component';

/** Golden WU content-scheduling-page-helpers. */
describe('AdminContentSchedulingComponent page helpers (golden WU)', () => {
  function bare(page: number, total: number): AdminContentSchedulingComponent {
    const cmp = Object.create(AdminContentSchedulingComponent.prototype) as AdminContentSchedulingComponent;
    Object.assign(cmp as any, {
      page: signal(page),
      meta: signal({ total_pages: total }),
      load: jasmine.createSpy('load'),
    });
    return cmp;
  }

  it('prevPage/nextPage respect bounds', () => {
    const a = bare(1, 3);
    a.prevPage();
    expect((a as any).load).not.toHaveBeenCalled();
    const b = bare(2, 3);
    b.prevPage();
    expect((b as any).page()).toBe(1);
    expect((b as any).load).toHaveBeenCalled();
    const c = bare(3, 3);
    c.nextPage();
    expect((c as any).load).not.toHaveBeenCalled();
    const d = bare(2, 3);
    d.nextPage();
    expect((d as any).page()).toBe(3);
  });
});
