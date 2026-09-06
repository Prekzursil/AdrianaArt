import { signal } from '@angular/core';
import { AdminReturnsComponent } from './admin-returns.component';

/** Golden WU returns-has-prev — hasPrev. */
describe('AdminReturnsComponent hasPrev (golden WU)', () => {
  function bare(page: number): AdminReturnsComponent {
    const cmp = Object.create(AdminReturnsComponent.prototype) as AdminReturnsComponent;
    Object.assign(cmp as any, { meta: signal({ page, total_pages: 5 }) });
    return cmp;
  }

  it('is true only when page is greater than 1', () => {
    expect(bare(1).hasPrev()).toBe(false);
    expect(bare(2).hasPrev()).toBe(true);
    expect(bare(0).hasPrev()).toBe(false); // defaults to 1
  });
});
