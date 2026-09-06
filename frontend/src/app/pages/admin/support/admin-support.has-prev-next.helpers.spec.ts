import { AdminSupportComponent } from './admin-support.component';

/** Golden WU support-has-prev-next — hasPrev/hasNext. */
describe('AdminSupportComponent hasPrev/hasNext (golden WU)', () => {
  it('uses meta.page vs meta.total_pages', () => {
    const cmp = Object.create(AdminSupportComponent.prototype) as AdminSupportComponent;
    (cmp as any).meta = () => ({ page: 1, total_pages: 1 });
    expect(cmp.hasPrev()).toBe(false);
    expect(cmp.hasNext()).toBe(false);
    (cmp as any).meta = () => ({ page: 2, total_pages: 4 });
    expect(cmp.hasPrev()).toBe(true);
    expect(cmp.hasNext()).toBe(true);
  });
});
