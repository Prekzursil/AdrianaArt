import { AdminDashboardComponent } from './admin-dashboard.component';

/** Golden WU dashboard-can-show-payments-health — canShowPaymentsHealth. */
describe('AdminDashboardComponent canShowPaymentsHealth (golden WU)', () => {
  function bare(ok: boolean): AdminDashboardComponent {
    const cmp = Object.create(AdminDashboardComponent.prototype) as AdminDashboardComponent;
    Object.assign(cmp as any, {
      auth: { canAccessAdminSection: (s: string) => (s === 'ops' ? ok : false) },
    });
    return cmp;
  }

  it('gates on ops admin section access', () => {
    expect(bare(true).canShowPaymentsHealth()).toBe(true);
    expect(bare(false).canShowPaymentsHealth()).toBe(false);
  });
});
