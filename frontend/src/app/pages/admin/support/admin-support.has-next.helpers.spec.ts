import { signal } from '@angular/core';
import { AdminSupportComponent } from './admin-support.component';

/** Golden WU support-has-next — hasNext. */
describe('AdminSupportComponent hasNext (golden WU)', () => {
  function bare(meta: { page: number; total_pages: number }): AdminSupportComponent {
    const cmp = Object.create(AdminSupportComponent.prototype) as AdminSupportComponent;
    Object.assign(cmp as any, {
      meta: signal({ page: meta.page, total_pages: meta.total_pages, total_items: 0, limit: 20 }),
    });
    return cmp;
  }

  it('is true only when page is below total_pages', () => {
    expect(bare({ page: 1, total_pages: 1 }).hasNext()).toBe(false);
    expect(bare({ page: 1, total_pages: 3 }).hasNext()).toBe(true);
    expect(bare({ page: 3, total_pages: 3 }).hasNext()).toBe(false);
  });
});
