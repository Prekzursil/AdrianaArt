import { AdminClientErrorLoggerService } from './admin-client-error-logger.service';

/** Golden WU admin-client-error-logger-update-enabled — updateEnabled. */
describe('AdminClientErrorLoggerService updateEnabled (golden WU)', () => {
  it('enables only on /admin and /admin/* paths', () => {
    const svc = Object.create(
      AdminClientErrorLoggerService.prototype,
    ) as AdminClientErrorLoggerService;
    (svc as any).updateEnabled('/shop');
    expect((svc as any).enabled).toBe(false);
    (svc as any).updateEnabled('/admin');
    expect((svc as any).enabled).toBe(true);
    (svc as any).updateEnabled('/admin/orders');
    expect((svc as any).enabled).toBe(true);
    (svc as any).updateEnabled('  /admin/users  ');
    expect((svc as any).enabled).toBe(true);
  });
});
