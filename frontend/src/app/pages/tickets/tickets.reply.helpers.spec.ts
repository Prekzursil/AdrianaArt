import { TicketsComponent } from './tickets.component';

/** Golden WU tickets-reply -- reply. */
describe('TicketsComponent reply (golden WU)', () => {
  it('no-ops when no ticket is selected', () => {
    const cmp = Object.create(TicketsComponent.prototype) as TicketsComponent;
    Object.assign(cmp as any, {
      selected: jasmine.createSpy('selected').and.returnValue(null),
      ticketsApi: { addMessage: jasmine.createSpy('addMessage') },
    });
    cmp.reply({ valid: true } as any);
    expect((cmp as any).ticketsApi.addMessage).not.toHaveBeenCalled();
  });

  it('toasts when form is invalid', () => {
    const cmp = Object.create(TicketsComponent.prototype) as TicketsComponent;
    Object.assign(cmp as any, {
      selected: jasmine.createSpy('selected').and.returnValue({ id: 't1' }),
      translate: { instant: jasmine.createSpy('instant').and.returnValue('bad') },
      toast: { error: jasmine.createSpy('error') },
      ticketsApi: { addMessage: jasmine.createSpy('addMessage') },
    });
    cmp.reply({ valid: false } as any);
    expect((cmp as any).toast.error).toHaveBeenCalledWith('bad');
    expect((cmp as any).ticketsApi.addMessage).not.toHaveBeenCalled();
  });
});
