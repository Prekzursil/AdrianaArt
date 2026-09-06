import { AdminSupportComponent } from './admin-support.component';

/** Golden WU admin-support-send-reply -- sendReply. */
describe('AdminSupportComponent sendReply (golden WU)', () => {
  it('toasts error when reply message is empty', () => {
    const cmp = Object.create(AdminSupportComponent.prototype) as AdminSupportComponent;
    Object.assign(cmp as any, {
      selected: jasmine.createSpy('selected').and.returnValue({ id: 't1' }),
      replyMessage: '   ',
      toast: { error: jasmine.createSpy('error') },
      translate: { instant: jasmine.createSpy('instant').and.returnValue('reply-err') },
      replying: { set: jasmine.createSpy('set') },
    });
    cmp.sendReply();
    expect((cmp as any).toast.error).toHaveBeenCalledWith('reply-err');
    expect((cmp as any).replying.set).not.toHaveBeenCalled();
  });
});
