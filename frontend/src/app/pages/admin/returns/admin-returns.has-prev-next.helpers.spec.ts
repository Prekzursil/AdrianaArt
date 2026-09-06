import { AdminReturnsComponent } from './admin-returns.component';

/** Golden WU returns-has-prev-next — hasPrev/hasNext. */
describe('AdminReturnsComponent hasPrev/hasNext (golden WU)', () => {
  it('compares meta.page against total_pages with defaults', () => {
    const cmp = Object.create(AdminReturnsComponent.prototype) as AdminReturnsComponent;
    (cmp as any).meta = () => ({});
    expect(cmp.hasPrev()).toBe(false);
    expect(cmp.hasNext()).toBe(false);
    (cmp as any).meta = () => ({ page: 2, total_pages: 3 });
    expect(cmp.hasPrev()).toBe(true);
    expect(cmp.hasNext()).toBe(true);
    (cmp as any).meta = () => ({ page: 3, total_pages: 3 });
    expect(cmp.hasPrev()).toBe(true);
    expect(cmp.hasNext()).toBe(false);
  });
});
