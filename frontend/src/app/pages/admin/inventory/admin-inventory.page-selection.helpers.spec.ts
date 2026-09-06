import { AdminInventoryComponent } from './admin-inventory.component';

/** Golden WU inventory-page-selection-helpers. */
describe('AdminInventoryComponent page selection helpers (golden WU)', () => {
  function bare(
    rows: Array<{ kind: string; product_id: string; variant_id?: string | null }>,
    selectedKeys: string[] = [],
  ): AdminInventoryComponent {
    const cmp = Object.create(AdminInventoryComponent.prototype) as AdminInventoryComponent;
    Object.assign(cmp as any, {
      rows: () => rows,
      selected: new Set(selectedKeys),
    });
    return cmp;
  }

  it('isSelected / allSelectedOnPage / clearSelection / trackByKey', () => {
    const row = { kind: 'variant', product_id: 'p1', variant_id: 'v1' };
    const key = 'variant:v1';
    expect(bare([row]).isSelected(row as any)).toBe(false);
    expect(bare([row], [key]).isSelected(row as any)).toBe(true);
    expect(bare([]).allSelectedOnPage()).toBe(false);
    expect(bare([row], []).allSelectedOnPage()).toBe(false);
    expect(bare([row], [key]).allSelectedOnPage()).toBe(true);
    const cmp = bare([row], [key]);
    expect(cmp.trackByKey(0, row as any)).toBe(key);
    cmp.clearSelection();
    expect((cmp as any).selected.size).toBe(0);
  });
});
