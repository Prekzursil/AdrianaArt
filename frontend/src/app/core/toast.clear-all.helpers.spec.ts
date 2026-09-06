import { ToastService } from './toast.service';

/** Golden WU toast-clear-all — clearAll. */
describe('ToastService clearAll (golden WU)', () => {
  it('empties the messages signal', () => {
    const svc = Object.create(ToastService.prototype) as ToastService;
    const state = { value: [{ id: '1', title: 'hi', tone: 'info' }] as any[] };
    Object.assign(svc as any, {
      messagesSignal: {
        set: (v: any[]) => {
          state.value = v;
        },
      },
    });
    svc.clearAll();
    expect(state.value).toEqual([]);
  });
});
