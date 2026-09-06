import { HttpErrorBusService } from './http-error-bus.service';

/** Golden WU http-error-bus-emit -- emit. */
describe('HttpErrorBusService emit (golden WU)', () => {
  it('forwards the event to the subject', () => {
    const svc = Object.create(HttpErrorBusService.prototype) as HttpErrorBusService;
    const next = jasmine.createSpy('next');
    Object.assign(svc as any, { subject: { next } });
    const event = { status: 500, method: 'GET', url: '/x' };
    svc.emit(event);
    expect(next).toHaveBeenCalledWith(event);
  });
});
