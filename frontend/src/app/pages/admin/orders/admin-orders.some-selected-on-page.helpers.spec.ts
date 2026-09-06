import { AdminOrdersComponent } from './admin-orders.component';

/** Golden WU orders-some-selected-on-page — someSelectedOnPage. */
describe('AdminOrdersComponent someSelectedOnPage (golden WU)', () => {
  it('false when empty/none/all; true when partial', () => {
    const cmp = Object.create(AdminOrdersComponent.prototype) as AdminOrdersComponent;
    (cmp as any).orders = () => [];
    (cmp as any).selectedIds = new Set();
    expect(cmp.someSelectedOnPage()).toBe(false);
    (cmp as any).orders = () => [{ id: 'a' }, { id: 'b' }];
    expect(cmp.someSelectedOnPage()).toBe(false);
    (cmp as any).selectedIds = new Set(['a']);
    expect(cmp.someSelectedOnPage()).toBe(true);
    (cmp as any).selectedIds = new Set(['a', 'b']);
    expect(cmp.someSelectedOnPage()).toBe(false);
  });
});
