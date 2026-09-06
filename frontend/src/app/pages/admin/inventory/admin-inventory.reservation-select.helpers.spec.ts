import { AdminInventoryComponent } from './admin-inventory.component';

/** Golden WU — reservation title/subtitle + row selection helpers. */
describe('AdminInventoryComponent reservation/select helpers (golden WU)', () => {
  function bare(overrides: Record<string, unknown> = {}): AdminInventoryComponent {
    const cmp = Object.create(AdminInventoryComponent.prototype) as AdminInventoryComponent;
    Object.assign(cmp as any, {
      reservationsKind: () => 'carts',
      reservationsTarget: () => null,
      selected: new Set<string>(),
      rows: () => [] as any[],
      rowKey: (row: { product_id: string; variant_id?: string | null }) =>
        `${row.product_id}:${row.variant_id ?? ''}`,
      ...overrides,
    });
    return cmp;
  }

  it('reservationTitleKey switches carts/orders/default', () => {
    expect(bare({ reservationsKind: () => 'carts' }).reservationTitleKey()).toBe(
      'adminUi.inventory.reservations.cartsTitle',
    );
    expect(bare({ reservationsKind: () => 'orders' }).reservationTitleKey()).toBe(
      'adminUi.inventory.reservations.ordersTitle',
    );
    expect(bare({ reservationsKind: () => 'other' }).reservationTitleKey()).toBe(
      'adminUi.inventory.title',
    );
  });

  it('reservationSubtitle formats variant and sku', () => {
    expect(bare().reservationSubtitle()).toBe('');
    expect(
      bare({
        reservationsTarget: () => ({
          product_name: 'Mug',
          variant_name: 'Blue',
          sku: 'SKU-1',
        }),
      }).reservationSubtitle(),
    ).toBe('Mug — Blue · SKU-1');
    expect(
      bare({
        reservationsTarget: () => ({ product_name: 'Mug', sku: 'SKU-1' }),
      }).reservationSubtitle(),
    ).toBe('Mug · SKU-1');
  });

  it('isSelected / allSelectedOnPage use rowKey membership', () => {
    const selected = new Set<string>(['p1:']);
    const rows = [{ product_id: 'p1', variant_id: null }, { product_id: 'p2', variant_id: null }];
    const cmp = bare({ selected, rows: () => rows });
    expect(cmp.isSelected(rows[0] as any)).toBe(true);
    expect(cmp.isSelected(rows[1] as any)).toBe(false);
    expect(cmp.allSelectedOnPage()).toBe(false);
    selected.add('p2:');
    expect(cmp.allSelectedOnPage()).toBe(true);
    expect(bare({ rows: () => [] }).allSelectedOnPage()).toBe(false);
  });
});
