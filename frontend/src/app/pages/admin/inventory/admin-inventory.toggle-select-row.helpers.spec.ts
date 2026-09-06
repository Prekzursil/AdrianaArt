import { AdminInventoryComponent } from './admin-inventory.component';

/** Golden WU admin-inventory-toggle-select-row -- toggleSelectRow. */
describe('AdminInventoryComponent toggleSelectRow (golden WU)', () => {
  it('adds or removes a row key from selection', () => {
    const cmp = Object.create(AdminInventoryComponent.prototype) as AdminInventoryComponent;
    Object.assign(cmp as any, {
      selected: new Set<string>(),
      rowKey: () => 'product:p1',
    });
    const row = { kind: 'product', product_id: 'p1' } as any;
    cmp.toggleSelectRow(row, { target: { checked: true } } as any);
    expect((cmp as any).selected.has('product:p1')).toBe(true);
    cmp.toggleSelectRow(row, { target: { checked: false } } as any);
    expect((cmp as any).selected.has('product:p1')).toBe(false);
  });
});
