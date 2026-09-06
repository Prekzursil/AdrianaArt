import { AdminSupportComponent } from './admin-support.component';

describe('AdminSupportComponent hasPrev (golden WU)', () => {
  it('is true only when meta.page > 1', () => {
    const cmp = Object.create(AdminSupportComponent.prototype) as AdminSupportComponent;
    (cmp as any).meta = () => ({ page: 1, total_pages: 5 });
    expect(cmp.hasPrev()).toBe(false);
    (cmp as any).meta = () => ({ page: 2, total_pages: 5 });
    expect(cmp.hasPrev()).toBe(true);
  });
});
