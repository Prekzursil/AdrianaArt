import { AdminInventoryComponent } from './admin-inventory.component';

/** Golden WU inventory-reservation-subtitle — reservationSubtitle. */
describe('AdminInventoryComponent reservationSubtitle (golden WU)', () => {
  it('formats product/variant/sku subtitle', () => {
    const cmp = Object.create(AdminInventoryComponent.prototype) as AdminInventoryComponent;
    (cmp as any).reservationsTarget = () => null;
    expect(cmp.reservationSubtitle()).toBe('');
    (cmp as any).reservationsTarget = () => ({
      product_name: 'Mug',
      variant_name: 'Blue',
      sku: 'SKU-1',
    });
    expect(cmp.reservationSubtitle()).toBe('Mug — Blue · SKU-1');
    (cmp as any).reservationsTarget = () => ({
      product_name: 'Mug',
      variant_name: null,
      sku: 'SKU-1',
    });
    expect(cmp.reservationSubtitle()).toBe('Mug · SKU-1');
  });
});
