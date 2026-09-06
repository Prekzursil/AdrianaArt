import { AdminInventoryComponent } from './admin-inventory.component';

/** Golden WU admin-inventory-toggle-select-all -- toggleSelectAll. */
describe('AdminInventoryComponent toggleSelectAll (golden WU)', () => {
  it('clears selection when unchecked', () => {
    const cmp = Object.create(AdminInventoryComponent.prototype) as AdminInventoryComponent;
    Object.assign(cmp as any, {
      selected: new Set(['a', 'b']),
      rows: jasmine.createSpy('rows').and.returnValue([
        { product_id: 'p1', kind: 'product' },
      ]),
      rowKey: jasmine.createSpy('rowKey').and.returnValue('a'),
    });
    cmp.toggleSelectAll({ target: { checked: false } } as any);
    expect((cmp as any).selected.has('a')).toBe(false);
  });
});
