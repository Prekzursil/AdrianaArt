import { AdminInventoryComponent } from './admin-inventory.component';

/** Golden WU inventory-reservation-title-key — reservationTitleKey. */
describe('AdminInventoryComponent reservationTitleKey (golden WU)', () => {
  it('maps reservation kind to title keys', () => {
    const cmp = Object.create(AdminInventoryComponent.prototype) as AdminInventoryComponent;
    (cmp as any).reservationsKind = () => 'carts';
    expect(cmp.reservationTitleKey()).toBe('adminUi.inventory.reservations.cartsTitle');
    (cmp as any).reservationsKind = () => 'orders';
    expect(cmp.reservationTitleKey()).toBe('adminUi.inventory.reservations.ordersTitle');
    (cmp as any).reservationsKind = () => 'other';
    expect(cmp.reservationTitleKey()).toBe('adminUi.inventory.title');
  });
});
