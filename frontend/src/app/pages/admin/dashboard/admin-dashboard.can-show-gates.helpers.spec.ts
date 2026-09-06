import { AdminDashboardComponent } from './admin-dashboard.component';

/** Golden WU dashboard-can-show-gates-helpers. */
describe('AdminDashboardComponent can-show/label helpers (golden WU)', () => {
  function bare(sections: string[] = []): AdminDashboardComponent {
    const set = new Set(sections);
    const cmp = Object.create(AdminDashboardComponent.prototype) as AdminDashboardComponent;
    Object.assign(cmp as any, {
      auth: { canAccessAdminSection: (s: string) => set.has(s) },
    });
    return cmp;
  }

  it('canShow* gates map to admin sections', () => {
    expect(bare(['ops']).canShowPaymentsHealth()).toBe(true);
    expect(bare().canShowPaymentsHealth()).toBe(false);
    expect(bare(['orders']).canShowRefundsBreakdown()).toBe(true);
    expect(bare(['returns']).canShowRefundsBreakdown()).toBe(true);
    expect(bare(['orders']).canShowShippingPerformance()).toBe(true);
    expect(bare(['inventory']).canShowStockoutImpact()).toBe(true);
    expect(bare(['dashboard']).canShowChannelAttribution()).toBe(true);
  });

  it('provider/reason label keys and webhook metric support', () => {
    const cmp = bare();
    expect(cmp.paymentsProviderLabelKey('stripe')).toContain('stripe');
    expect(cmp.paymentsProviderLabelKey('weird')).toContain('unknown');
    expect(cmp.supportsWebhookMetrics('paypal')).toBe(true);
    expect(cmp.supportsWebhookMetrics('cod')).toBe(false);
    expect(cmp.refundProviderLabelKey('manual')).toContain('manual');
    expect(cmp.refundProviderLabelKey('x')).toContain('unknown');
    expect(cmp.refundReasonLabelKey('damaged')).toContain('damaged');
    expect(cmp.refundReasonLabelKey('???')).toContain('other');
  });
});
