import { AdminOrdersComponent } from './admin-orders.component';

/** Golden WU admin-orders-toggle-selected -- toggleSelected. */
describe('AdminOrdersComponent toggleSelected (golden WU)', () => {
  it('adds and removes ids unless bulk busy', () => {
    const cmp = Object.create(AdminOrdersComponent.prototype) as AdminOrdersComponent;
    Object.assign(cmp as any, {
      bulkBusy: false,
      selectedIds: new Set<string>(),
    });
    cmp.toggleSelected('o1', true);
    expect((cmp as any).selectedIds.has('o1')).toBe(true);
    cmp.toggleSelected('o1', false);
    expect((cmp as any).selectedIds.has('o1')).toBe(false);

    (cmp as any).bulkBusy = true;
    cmp.toggleSelected('o2', true);
    expect((cmp as any).selectedIds.has('o2')).toBe(false);
  });
});
