import { signal } from '@angular/core';
import { AdminSupportComponent } from './admin-support.component';

/** Golden WU support-has-prev-next-helpers. */
describe('AdminSupportComponent pagination helpers (golden WU)', () => {
  function bare(page: number, total: number): AdminSupportComponent {
    const cmp = Object.create(AdminSupportComponent.prototype) as AdminSupportComponent;
    Object.assign(cmp as any, { meta: signal({ page, total_pages: total }) });
    return cmp;
  }

  it('hasPrev/hasNext from meta pages', () => {
    expect(bare(1, 3).hasPrev()).toBe(false);
    expect(bare(2, 3).hasPrev()).toBe(true);
    expect(bare(3, 3).hasNext()).toBe(false);
    expect(bare(2, 3).hasNext()).toBe(true);
  });
});
