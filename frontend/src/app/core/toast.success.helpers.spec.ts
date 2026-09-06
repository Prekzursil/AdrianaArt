import { ToastService } from './toast.service';

/** Golden WU toast-success — success. */
describe('ToastService success (golden WU)', () => {
  it('delegates to push with tone success', () => {
    const svc = Object.create(ToastService.prototype) as ToastService;
    const calls: any[] = [];
    Object.assign(svc as any, {
      push: (msg: any) => calls.push(msg),
    });
    svc.success('Saved');
    expect(calls).toEqual([{ title: 'Saved', description: undefined, tone: 'success' }]);
  });
});
