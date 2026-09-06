import { signal } from '@angular/core';
import { AdminInventoryComponent } from './admin-inventory.component';

/** Golden WU inventory-selection-clear-helpers. */
describe('AdminInventoryComponent selection helpers (golden WU)', () => {
  function bare(): AdminInventoryComponent {
    const cmp = Object.create(AdminInventoryComponent.prototype) as AdminInventoryComponent;
    Object.assign(cmp as any, {
      selected: new Set<string>(),
      rowKey: (row: any) => row.key,
      rows: signal([{ key: 'a' }, { key: 'b' }]),
    });
    return cmp;
  }

  it('toggleSelectRow / clearSelection / toggleSelectAll', () => {
    const cmp = bare();
    cmp.toggleSelectRow({ key: 'a' } as any, { target: { checked: true } } as any);
    expect((cmp as any).selected.has('a')).toBe(true);
    cmp.toggleSelectAll({ target: { checked: true } } as any);
    expect((cmp as any).selected.size).toBe(2);
    cmp.toggleSelectAll({ target: { checked: false } } as any);
    expect((cmp as any).selected.size).toBe(0);
    (cmp as any).selected.add('x');
    cmp.clearSelection();
    expect((cmp as any).selected.size).toBe(0);
  });
});
