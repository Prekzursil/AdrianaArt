import { signal } from '@angular/core';
import { AdminDashboardComponent } from './admin-dashboard.component';

/** Golden WU dashboard-audit-has-prev — auditHasPrev. */
describe('AdminDashboardComponent auditHasPrev (golden WU)', () => {
  function bare(meta: any): AdminDashboardComponent {
    const cmp = Object.create(AdminDashboardComponent.prototype) as AdminDashboardComponent;
    Object.assign(cmp as any, {
      auditEntries: signal(meta === null ? null : { meta, items: [] }),
    });
    return cmp;
  }

  it('is true when current page is above 1', () => {
    expect(bare(null).auditHasPrev()).toBe(false); // defaults to page 1
    expect(bare({ page: 1, total_pages: 5 }).auditHasPrev()).toBe(false);
    expect(bare({ page: 2, total_pages: 5 }).auditHasPrev()).toBe(true);
  });
});
