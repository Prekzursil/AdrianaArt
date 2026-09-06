import { signal } from '@angular/core';
import { AdminDashboardComponent } from './admin-dashboard.component';

/** Golden WU dashboard-audit-has-next — auditHasNext. */
describe('AdminDashboardComponent auditHasNext (golden WU)', () => {
  function bare(meta: any): AdminDashboardComponent {
    const cmp = Object.create(AdminDashboardComponent.prototype) as AdminDashboardComponent;
    Object.assign(cmp as any, {
      auditEntries: signal(meta === null ? null : { meta, items: [] }),
    });
    return cmp;
  }

  it('is true only when page is below total_pages', () => {
    expect(bare(null).auditHasNext()).toBe(false);
    expect(bare({ page: 1, total_pages: 1 }).auditHasNext()).toBe(false);
    expect(bare({ page: 1, total_pages: 3 }).auditHasNext()).toBe(true);
    expect(bare({ page: 3, total_pages: 3 }).auditHasNext()).toBe(false);
  });
});
