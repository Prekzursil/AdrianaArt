import { AdminDashboardComponent } from './admin-dashboard.component';

/** Golden WU dashboard-can-show-refunds-breakdown — canShowRefundsBreakdown. */
describe('AdminDashboardComponent canShowRefundsBreakdown (golden WU)', () => {
  function bare(sections: string[]): AdminDashboardComponent {
    const cmp = Object.create(AdminDashboardComponent.prototype) as AdminDashboardComponent;
    Object.assign(cmp as any, {
      auth: { canAccessAdminSection: (s: string) => sections.includes(s) },
    });
    return cmp;
  }

  it('requires orders or returns access', () => {
    expect(bare([]).canShowRefundsBreakdown()).toBe(false);
    expect(bare(['orders']).canShowRefundsBreakdown()).toBe(true);
    expect(bare(['returns']).canShowRefundsBreakdown()).toBe(true);
    expect(bare(['ops']).canShowRefundsBreakdown()).toBe(false);
  });
});
