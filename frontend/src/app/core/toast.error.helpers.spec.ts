import { ToastService } from './toast.service';

/** Golden WU toast-error — error. */
describe('ToastService error (golden WU)', () => {
  it('delegates to push with tone error', () => {
    const svc = Object.create(ToastService.prototype) as ToastService;
    const calls: any[] = [];
    Object.assign(svc as any, {
      push: (msg: any) => calls.push(msg),
    });
    svc.error('Boom', 'detail');
    expect(calls).toEqual([{ title: 'Boom', description: 'detail', tone: 'error' }]);
  });
});
