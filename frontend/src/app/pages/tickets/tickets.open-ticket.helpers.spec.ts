import { TicketsComponent } from './tickets.component';

/** Golden WU tickets-open-ticket -- openTicket. */
describe('TicketsComponent openTicket (golden WU)', () => {
  it('loads ticket detail and clears replyMessage on success', () => {
    const cmp = Object.create(TicketsComponent.prototype) as TicketsComponent;
    const ticket = { id: 't1' };
    Object.assign(cmp as any, {
      replyMessage: 'draft',
      selected: { set: jasmine.createSpy('set') },
      ticketsApi: {
        getOne: jasmine.createSpy('getOne').and.returnValue({
          subscribe: (h: any) => h.next(ticket),
        }),
      },
      toast: { error: jasmine.createSpy('error') },
    });
    cmp.openTicket('t1');
    expect((cmp as any).ticketsApi.getOne).toHaveBeenCalledWith('t1');
    expect((cmp as any).selected.set).toHaveBeenCalledWith(ticket);
    expect((cmp as any).replyMessage).toBe('');
  });
});
