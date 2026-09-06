import { ToastService } from './toast.service';

/** Golden WU toast-messages — messages. */
describe('ToastService messages (golden WU)', () => {
  it('returns the readonly view of the messages signal', () => {
    const svc = Object.create(ToastService.prototype) as ToastService;
    const readonly = (() => []) as any;
    Object.assign(svc as any, {
      messagesSignal: {
        asReadonly: () => readonly,
      },
    });
    expect(svc.messages()).toBe(readonly);
  });
});
