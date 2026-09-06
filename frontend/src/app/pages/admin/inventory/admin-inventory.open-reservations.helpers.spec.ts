import { AdminInventoryComponent } from './admin-inventory.component';

/** Golden WU admin-inventory-open-reservations -- openReservations. */
describe('AdminInventoryComponent openReservations (golden WU)', () => {
  it('returns early when reservations already loading', () => {
    const cmp = Object.create(AdminInventoryComponent.prototype) as AdminInventoryComponent;
    Object.assign(cmp as any, {
      reservationsLoading: jasmine.createSpy('loading').and.returnValue(true),
      reservationsOpen: { set: jasmine.createSpy('open') },
      reloadReservations: jasmine.createSpy('reload'),
    });
    cmp.openReservations({ product_id: 'p1', kind: 'product', sku: 's' } as any, 'carts');
    expect((cmp as any).reservationsOpen.set).not.toHaveBeenCalled();
    expect((cmp as any).reloadReservations).not.toHaveBeenCalled();
  });
});
