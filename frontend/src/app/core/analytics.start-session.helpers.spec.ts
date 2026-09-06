import { AnalyticsService } from './analytics.service';

/** Golden WU analytics-start-session — startSession. */
describe('AnalyticsService startSession (golden WU)', () => {
  it('no-ops when disabled or already started; otherwise persists and sends', () => {
    const svc = Object.create(AnalyticsService.prototype) as AnalyticsService;
    const sends: any[] = [];
    Object.assign(svc as any, {
      enabledState: () => false,
      sessionStarted: false,
      persistSessionStarted: () => undefined,
      getAttributionPayload: () => ({ utm_source: 'x' }),
      send: (e: string, p: any) => sends.push([e, p]),
    });
    svc.startSession();
    expect(sends).toEqual([]);

    Object.assign(svc as any, { enabledState: () => true, sessionStarted: true });
    svc.startSession();
    expect(sends).toEqual([]);

    let persisted: boolean | null = null;
    Object.assign(svc as any, {
      sessionStarted: false,
      persistSessionStarted: (v: boolean) => (persisted = v),
    });
    svc.startSession();
    expect(persisted).toBe(true);
    expect((svc as any).sessionStarted).toBe(true);
    expect(sends).toEqual([['session_start', { utm_source: 'x' }]]);
  });
});
