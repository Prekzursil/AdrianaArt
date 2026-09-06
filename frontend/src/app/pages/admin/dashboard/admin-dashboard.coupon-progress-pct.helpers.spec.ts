import { AdminDashboardComponent } from './admin-dashboard.component';

/** Golden WU tip — couponProgressPct. */
describe('AdminDashboardComponent couponProgressPct (golden WU)', () => {
  it('derives percent from processed/total_candidates', () => {
    const cmp = Object.create(AdminDashboardComponent.prototype) as AdminDashboardComponent;
    expect(cmp.couponProgressPct({ processed: 25, total_candidates: 100 } as any)).toBe(25);
    expect(cmp.couponProgressPct({ processed: 1, total_candidates: 0 } as any)).toBe(0);
    expect(cmp.couponProgressPct({} as any)).toBe(0);
  });
});
