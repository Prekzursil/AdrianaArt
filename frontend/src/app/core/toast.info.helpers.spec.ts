import { ToastService } from './toast.service';

/** Golden WU toast-info — info. */
describe('ToastService info (golden WU)', () => {
  it('delegates to push with tone info', () => {
    const svc = Object.create(ToastService.prototype) as ToastService;
    const calls: any[] = [];
    Object.assign(svc as any, {
      push: (msg: any) => calls.push(msg),
    });
    svc.info('Hello', 'world');
    expect(calls).toEqual([{ title: 'Hello', description: 'world', tone: 'info' }]);
  });
});
