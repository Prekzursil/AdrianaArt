import { AnalyticsService } from './analytics.service';

/** Golden WU analytics-set-enabled — setEnabled. */
describe('AnalyticsService setEnabled (golden WU)', () => {
  it('updates enabled state, persists, and starts session when enabling', () => {
    const svc = Object.create(AnalyticsService.prototype) as AnalyticsService;
    const calls: any = { enabled: null, persisted: null, started: 0 };
    Object.assign(svc as any, {
      enabledState: {
        set: (v: boolean) => (calls.enabled = v),
        call: () => calls.enabled,
      },
      persistEnabled: (v: boolean) => (calls.persisted = v),
      startSession: () => (calls.started += 1),
    });
    // enabledState() is invoked as a function in setEnabled after set
    (svc as any).enabledState = Object.assign(
      () => Boolean(calls.enabled),
      { set: (v: boolean) => (calls.enabled = v) },
    );
    svc.setEnabled(true);
    expect(calls.enabled).toBe(true);
    expect(calls.persisted).toBe(true);
    expect(calls.started).toBe(1);

    svc.setEnabled(false);
    expect(calls.enabled).toBe(false);
    expect(calls.persisted).toBe(false);
    expect(calls.started).toBe(1);
  });
});
