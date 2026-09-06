import { ClarityService } from './clarity.service';

/** Golden WU clarity-start — start. */
describe('ClarityService start (golden WU)', () => {
  it('returns early when already started', () => {
    const svc = Object.create(ClarityService.prototype) as ClarityService;
    let inits = 0;
    Object.assign(svc as any, {
      platformId: 'browser',
      started: true,
      maybeInit: () => (inits += 1),
      router: { events: { pipe: () => ({ subscribe: () => 'sub' }) } },
      analyticsOptInListener: () => undefined,
    });
    svc.start();
    expect(inits).toBe(0);
    expect((svc as any).started).toBe(true);
  });
});
