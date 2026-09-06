import { AdminInventoryComponent } from './admin-inventory.component';

/** Golden WU inventory-reservation-label-helpers. */
describe('AdminInventoryComponent reservation label helpers (golden WU)', () => {
  function bare(overrides: Record<string, unknown> = {}): AdminInventoryComponent {
    const cmp = Object.create(AdminInventoryComponent.prototype) as AdminInventoryComponent;
    Object.assign(cmp as any, {
      reservationsKind: () => null,
      reservationsTarget: () => null,
      ...overrides,
    });
    return cmp;
  }

  it('reservationTitleKey maps kind to title key', () => {
    expect(bare().reservationTitleKey()).toBe('adminUi.inventory.title');
    expect(bare({ reservationsKind: () => 'carts' }).reservationTitleKey()).toBe(
      'adminUi.inventory.reservations.cartsTitle',
    );
    expect(bare({ reservationsKind: () => 'orders' }).reservationTitleKey()).toBe(
      'adminUi.inventory.reservations.ordersTitle',
    );
  });

  it('reservationSubtitle formats product/variant/sku or empty', () => {
    expect(bare().reservationSubtitle()).toBe('');
    expect(
      bare({
        reservationsTarget: () => ({
          product_name: 'Mug',
          variant_name: 'Large',
          sku: 'MUG-L',
        }),
      }).reservationSubtitle(),
    ).toBe('Mug — Large · MUG-L');
    expect(
      bare({
        reservationsTarget: () => ({
          product_name: 'Mug',
          variant_name: null,
          sku: 'MUG',
        }),
      }).reservationSubtitle(),
    ).toBe('Mug · MUG');
  });
});
