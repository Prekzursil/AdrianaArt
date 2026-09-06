import { RouteRobotsService } from './route-robots.service';

/** Golden WU route-robots-start — start. */
describe('RouteRobotsService start (golden WU)', () => {
  it('no-ops when already started; otherwise applies and subscribes', () => {
    const svc = Object.create(RouteRobotsService.prototype) as RouteRobotsService;
    let applied = 0;
    Object.assign(svc as any, {
      started: true,
      applyCurrent: () => (applied += 1),
      router: { events: { pipe: () => ({ subscribe: () => 'sub' }) } },
    });
    svc.start();
    expect(applied).toBe(0);

    Object.assign(svc as any, { started: false });
    svc.start();
    expect((svc as any).started).toBe(true);
    expect(applied).toBe(1);
    expect((svc as any).navSub).toBe('sub');
  });
});
