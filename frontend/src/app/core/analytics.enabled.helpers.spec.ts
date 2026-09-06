import { AnalyticsService } from './analytics.service';

/** Golden WU analytics-enabled — enabled. */
describe('AnalyticsService enabled (golden WU)', () => {
  it('reads the enabled signal state', () => {
    const svc = Object.create(AnalyticsService.prototype) as AnalyticsService;
    Object.assign(svc as any, { enabledState: () => true });
    expect(svc.enabled()).toBe(true);
    Object.assign(svc as any, { enabledState: () => false });
    expect(svc.enabled()).toBe(false);
  });
});
