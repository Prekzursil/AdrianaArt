import { AdminInventoryComponent } from './admin-inventory.component';

/** Golden WU inventory-clear-selection — clearSelection. */
describe('AdminInventoryComponent clearSelection (golden WU)', () => {
  it('empties the selected set', () => {
    const cmp = Object.create(AdminInventoryComponent.prototype) as AdminInventoryComponent;
    Object.assign(cmp as any, { selected: new Set(['product:p1', 'variant:v1']) });
    cmp.clearSelection();
    expect((cmp as any).selected.size).toBe(0);
  });
});
