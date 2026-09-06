import { RouteHeadingFocusService } from './route-heading-focus.service';

/** Golden WU route-heading-focus-current — focusCurrentRouteHeading. */
describe('RouteHeadingFocusService focusCurrentRouteHeading (golden WU)', () => {
  it('clears pending timer and retries focus with runId', () => {
    const cleared: any[] = [];
    const retries: any[] = [];
    const timer = 42 as any;
    (globalThis as any).clearTimeout = (t: any) => cleared.push(t);
    const svc = Object.create(RouteHeadingFocusService.prototype) as RouteHeadingFocusService;
    Object.assign(svc as any, {
      focusTimer: timer,
      focusRunId: 3,
      focusWithRetries: (runId: number, attempt: number) => retries.push([runId, attempt]),
    });
    svc.focusCurrentRouteHeading(9);
    expect(cleared).toEqual([timer]);
    expect((svc as any).focusTimer).toBeNull();
    expect(retries).toEqual([[9, 0]]);
  });
});
