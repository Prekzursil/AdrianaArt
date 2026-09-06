import { AdminOrdersComponent } from './admin-orders.component';

/** Golden WU admin-orders-all-selected-on-page -- allSelectedOnPage. */
describe('AdminOrdersComponent allSelectedOnPage (golden WU)', () => {
  it('is true only when every page id is selected', () => {
    const cmp = Object.create(AdminOrdersComponent.prototype) as AdminOrdersComponent;
    Object.assign(cmp as any, {
      orders: () => [{ id: 'a' }, { id: 'b' }],
      selectedIds: new Set(['a']),
    });
    expect(cmp.allSelectedOnPage()).toBe(false);
    (cmp as any).selectedIds = new Set(['a', 'b']);
    expect(cmp.allSelectedOnPage()).toBe(true);
    (cmp as any).orders = () => [];
    expect(cmp.allSelectedOnPage()).toBe(false);
  });
});
