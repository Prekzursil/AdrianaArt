import { TicketsComponent } from './tickets.component';

/** Golden WU tickets-refresh -- refresh. */
describe('TicketsComponent refresh (golden WU)', () => {
  it('loads tickets and orders', () => {
    const cmp = Object.create(TicketsComponent.prototype) as TicketsComponent;
    Object.assign(cmp as any, {
      loading: { set: jasmine.createSpy('loadingSet') },
      tickets: { set: jasmine.createSpy('ticketsSet') },
      orders: { set: jasmine.createSpy('ordersSet') },
      ticketsApi: {
        listMine: jasmine.createSpy('listMine').and.returnValue({
          subscribe: (h: any) => h.next([{ id: 't1' }]),
        }),
      },
      account: {
        getOrders: jasmine.createSpy('getOrders').and.returnValue({
          subscribe: (h: any) => h.next([{ id: 'o1' }]),
        }),
      },
      toast: { error: jasmine.createSpy('error') },
    });
    cmp.refresh();
    expect((cmp as any).loading.set).toHaveBeenCalledWith(true);
    expect((cmp as any).tickets.set).toHaveBeenCalledWith([{ id: 't1' }]);
    expect((cmp as any).orders.set).toHaveBeenCalledWith([{ id: 'o1' }]);
    expect((cmp as any).loading.set).toHaveBeenCalledWith(false);
  });
});
