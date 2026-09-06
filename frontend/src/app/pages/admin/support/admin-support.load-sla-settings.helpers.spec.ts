import { AdminSupportComponent } from './admin-support.component';
import { of } from 'rxjs';

/** Golden WU admin-support-load-sla-settings -- loadSlaSettings. */
describe('AdminSupportComponent loadSlaSettings (golden WU)', () => {
  it('applies finite SLA hours from API', () => {
    const cmp = Object.create(AdminSupportComponent.prototype) as AdminSupportComponent;
    Object.assign(cmp as any, {
      api: {
        getSlaSettings: jasmine
          .createSpy('getSlaSettings')
          .and.returnValue(of({ first_reply_hours: 12.7, resolution_hours: 48.2 })),
      },
    });
    cmp.loadSlaSettings();
    expect((cmp as any).slaFirstReplyHours).toBe(12);
    expect((cmp as any).slaResolutionHours).toBe(48);
    expect((cmp as any).slaFirstReplyHoursDraft).toBe(12);
    expect((cmp as any).slaResolutionHoursDraft).toBe(48);
  });
});
