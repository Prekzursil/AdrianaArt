import { ToastService } from './toast.service';

/** Golden WU toast-clear — clear. */
describe('ToastService clear (golden WU)', () => {
  it('filters the matching toast id out of the signal', () => {
    const svc = Object.create(ToastService.prototype) as ToastService;
    let msgs = [
      { id: 'a', title: 'keep' },
      { id: 'b', title: 'drop' },
    ] as any[];
    Object.assign(svc as any, {
      messagesSignal: {
        update: (fn: (m: any[]) => any[]) => {
          msgs = fn(msgs);
        },
      },
    });
    svc.clear('b');
    expect(msgs.map((m) => m.id)).toEqual(['a']);
  });
});
