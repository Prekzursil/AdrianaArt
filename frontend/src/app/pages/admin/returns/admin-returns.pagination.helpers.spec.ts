import { signal } from '@angular/core';
import { AdminReturnsComponent } from './admin-returns.component';

/** Golden WU returns-pagination-helpers. */
describe('AdminReturnsComponent pagination helpers (golden WU)', () => {
  function bare(meta: Record<string, number>): AdminReturnsComponent {
    const cmp = Object.create(AdminReturnsComponent.prototype) as AdminReturnsComponent;
    Object.assign(cmp as any, { meta: signal(meta) });
    return cmp;
  }

  it('hasPrev/hasNext from meta page bounds', () => {
    expect(bare({ page: 1, total_pages: 3 }).hasPrev()).toBe(false);
    expect(bare({ page: 2, total_pages: 3 }).hasPrev()).toBe(true);
    expect(bare({ page: 3, total_pages: 3 }).hasNext()).toBe(false);
    expect(bare({ page: 2, total_pages: 3 }).hasNext()).toBe(true);
    expect(bare({}).hasPrev()).toBe(false);
    expect(bare({}).hasNext()).toBe(false);
  });
});
