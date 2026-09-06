import { signal } from '@angular/core';
import { AdminSupportComponent } from './admin-support.component';

/** Golden WU support-has-prev — hasPrev. */
describe('AdminSupportComponent hasPrev (golden WU)', () => {
  function bare(page: number): AdminSupportComponent {
    const cmp = Object.create(AdminSupportComponent.prototype) as AdminSupportComponent;
    Object.assign(cmp as any, {
      meta: signal({ page, total_pages: 5, total_items: 0, limit: 20 }),
    });
    return cmp;
  }

  it('is true only when page is greater than 1', () => {
    expect(bare(1).hasPrev()).toBe(false);
    expect(bare(2).hasPrev()).toBe(true);
  });
});
