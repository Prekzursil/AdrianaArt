import { AdminInventoryComponent } from './admin-inventory.component';

/** Golden WU admin-inventory-close-reservations -- closeReservations. */
describe('AdminInventoryComponent closeReservations (golden WU)', () => {
  it('clears reservation modal signal state', () => {
    const cmp = Object.create(AdminInventoryComponent.prototype) as AdminInventoryComponent;
    Object.assign(cmp as any, {
      reservationsOpen: { set: jasmine.createSpy('open') },
      reservationsKind: { set: jasmine.createSpy('kind') },
      reservationsTarget: { set: jasmine.createSpy('target') },
      reservationsError: { set: jasmine.createSpy('error') },
      reservationsCutoff: { set: jasmine.createSpy('cutoff') },
      reservationsCarts: { set: jasmine.createSpy('carts') },
      reservationsOrders: { set: jasmine.createSpy('orders') },
    });
    cmp.closeReservations();
    expect((cmp as any).reservationsOpen.set).toHaveBeenCalledWith(false);
    expect((cmp as any).reservationsKind.set).toHaveBeenCalledWith(null);
    expect((cmp as any).reservationsTarget.set).toHaveBeenCalledWith(null);
    expect((cmp as any).reservationsError.set).toHaveBeenCalledWith(null);
    expect((cmp as any).reservationsCutoff.set).toHaveBeenCalledWith(null);
    expect((cmp as any).reservationsCarts.set).toHaveBeenCalledWith([]);
    expect((cmp as any).reservationsOrders.set).toHaveBeenCalledWith([]);
  });
});
