import { AdminClientErrorLoggerService } from './admin-client-error-logger.service';

/** Golden WU admin-client-error-logger-should-send — shouldSend. */
describe('AdminClientErrorLoggerService shouldSend (golden WU)', () => {
  it('requires enabled + allowlisted staff role', () => {
    const svc = Object.create(
      AdminClientErrorLoggerService.prototype,
    ) as AdminClientErrorLoggerService;
    Object.assign(svc as any, {
      enabled: false,
      auth: { role: () => 'owner' },
    });
    expect((svc as any).shouldSend()).toBe(false);

    Object.assign(svc as any, { enabled: true, auth: { role: () => 'customer' } });
    expect((svc as any).shouldSend()).toBe(false);

    Object.assign(svc as any, { auth: { role: () => 'support' } });
    expect((svc as any).shouldSend()).toBe(true);
  });
});
