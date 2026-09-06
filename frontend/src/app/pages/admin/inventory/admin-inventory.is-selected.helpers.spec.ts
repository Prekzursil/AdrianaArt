import { AdminInventoryComponent } from './admin-inventory.component';

/** Golden WU inventory-is-selected — isSelected. */
describe('AdminInventoryComponent isSelected (golden WU)', () => {
  function bare(selected: Set<string>): AdminInventoryComponent {
    const cmp = Object.create(AdminInventoryComponent.prototype) as AdminInventoryComponent;
    Object.assign(cmp as any, { selected });
    return cmp;
  }

  it('checks selection by kind:variant_or_product key', () => {
    const row: any = { kind: 'variant', variant_id: 'v1', product_id: 'p1' };
    const selected = new Set<string>(['variant:v1']);
    expect(bare(selected).isSelected(row)).toBe(true);
    expect(bare(new Set()).isSelected(row)).toBe(false);
    expect(bare(selected).isSelected({ kind: 'product', product_id: 'p1' } as any)).toBe(false);
  });
});
