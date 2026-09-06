import { ToastComponent } from './toast.component';

/** Golden WU toast-run-action — runAction. */
describe('ToastComponent runAction (golden WU)', () => {
  it('clears the toast then invokes onAction', () => {
    const cmp = Object.create(ToastComponent.prototype) as ToastComponent;
    const clear = jasmine.createSpy('clear');
    const onAction = jasmine.createSpy('onAction');
    const event = {
      preventDefault: jasmine.createSpy('preventDefault'),
      stopPropagation: jasmine.createSpy('stopPropagation'),
    } as any;
    Object.assign(cmp as any, { toastService: { clear } });

    cmp.runAction({ id: 't1' } as any, event);
    expect(event.preventDefault).toHaveBeenCalled();
    expect(event.stopPropagation).toHaveBeenCalled();
    expect(clear).not.toHaveBeenCalled();

    cmp.runAction({ id: 't2', onAction } as any, event);
    expect(clear).toHaveBeenCalledWith('t2');
    expect(onAction).toHaveBeenCalled();
  });
});
