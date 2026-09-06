import { AdminDashboardComponent } from './admin-dashboard.component';

/** Golden WU dashboard-audit-preset-config — auditPresetConfig. */
describe('AdminDashboardComponent auditPresetConfig (golden WU)', () => {
  it('maps presets to entity/action filters', () => {
    const cmp = Object.create(AdminDashboardComponent.prototype) as AdminDashboardComponent;
    const fn = (AdminDashboardComponent.prototype as any).auditPresetConfig as (
      this: AdminDashboardComponent,
      preset: string,
    ) => { entity: string; action: string };
    expect(fn.call(cmp, 'security')).toEqual({ entity: 'security', action: '' });
    expect(fn.call(cmp, 'content')).toEqual({ entity: 'content', action: '' });
    expect(fn.call(cmp, 'catalog')).toEqual({ entity: 'product', action: '' });
    expect(fn.call(cmp, 'payments')).toEqual({
      entity: 'security',
      action: 'stripe,paypal,netopia,refund,payment,webhook,coupon,checkout',
    });
    expect(fn.call(cmp, 'other')).toEqual({ entity: 'all', action: '' });
  });
});
