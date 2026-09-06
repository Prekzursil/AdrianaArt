import { signal } from '@angular/core';
import { AdminReturnsComponent } from './admin-returns.component';

/** Golden WU returns-has-next — hasNext. */
describe('AdminReturnsComponent hasNext (golden WU)', () => {
  function bare(page: number, total_pages: number): AdminReturnsComponent {
    const cmp = Object.create(AdminReturnsComponent.prototype) as AdminReturnsComponent;
    Object.assign(cmp as any, { meta: signal({ page, total_pages }) });
    return cmp;
  }

  it('is true when page is below total_pages', () => {
    expect(bare(1, 1).hasNext()).toBe(false);
    expect(bare(1, 2).hasNext()).toBe(true);
    expect(bare(2, 2).hasNext()).toBe(false);
    expect(bare(0, 0).hasNext()).toBe(false); // defaults to 1 < 1
  });
});
