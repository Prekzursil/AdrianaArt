import { AdminOrdersComponent } from './admin-orders.component';

/** Golden WU orders-page-selection-helpers. */
describe('AdminOrdersComponent page selection helpers (golden WU)', () => {
  function bare(ids: string[], selected: string[]): AdminOrdersComponent {
    const cmp = Object.create(AdminOrdersComponent.prototype) as AdminOrdersComponent;
    Object.assign(cmp as any, {
      orders: () => ids.map((id) => ({ id })),
      selectedIds: new Set(selected),
    });
    return cmp;
  }

  it('allSelectedOnPage requires non-empty page with every id selected', () => {
    expect(bare([], []).allSelectedOnPage()).toBe(false);
    expect(bare(['a', 'b'], ['a']).allSelectedOnPage()).toBe(false);
    expect(bare(['a', 'b'], ['a', 'b']).allSelectedOnPage()).toBe(true);
  });

  it('someSelectedOnPage is true for partial selection only', () => {
    expect(bare(['a', 'b'], []).someSelectedOnPage()).toBe(false);
    expect(bare(['a', 'b'], ['a']).someSelectedOnPage()).toBe(true);
    expect(bare(['a', 'b'], ['a', 'b']).someSelectedOnPage()).toBe(false);
  });

  it('clearSelection empties selectedIds', () => {
    const cmp = bare(['a'], ['a']);
    cmp.clearSelection();
    expect((cmp as any).selectedIds.size).toBe(0);
  });
});
