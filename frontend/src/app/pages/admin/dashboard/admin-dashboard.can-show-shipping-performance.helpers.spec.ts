import { AdminDashboardComponent } from './admin-dashboard.component';

/** Golden WU dashboard-can-show-shipping-performance — canShowShippingPerformance. */
describe('AdminDashboardComponent canShowShippingPerformance (golden WU)', () => {
  function bare(sections: string[]): AdminDashboardComponent {
    const cmp = Object.create(AdminDashboardComponent.prototype) as AdminDashboardComponent;
    Object.assign(cmp as any, {
      auth: { canAccessAdminSection: (s: string) => sections.includes(s) },
    });
    return cmp;
  }

  it('requires orders access', () => {
    expect(bare([]).canShowShippingPerformance()).toBe(false);
    expect(bare(['orders']).canShowShippingPerformance()).toBe(true);
    expect(bare(['returns']).canShowShippingPerformance()).toBe(false);
  });
});
