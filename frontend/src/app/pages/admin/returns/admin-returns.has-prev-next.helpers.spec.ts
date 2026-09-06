import { AdminReturnsComponent } from './admin-returns.component';

describe('AdminReturnsComponent hasPrev/hasNext (golden WU)', () => {
  it('gates pagination from meta.page / meta.total_pages', () => {
    const cmp = Object.create(AdminReturnsComponent.prototype) as AdminReturnsComponent;
    (cmp as any).meta = () => ({ page: 1, total_pages: 3 });
    expect(cmp.hasPrev()).toBe(false);
    expect(cmp.hasNext()).toBe(true);
    (cmp as any).meta = () => ({ page: 3, total_pages: 3 });
    expect(cmp.hasPrev()).toBe(true);
    expect(cmp.hasNext()).toBe(false);
    (cmp as any).meta = () => ({ page: undefined, total_pages: undefined });
    expect(cmp.hasPrev()).toBe(false);
    expect(cmp.hasNext()).toBe(false);
  });
});
