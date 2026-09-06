import { signal } from '@angular/core';
import { AdminOrdersComponent } from './admin-orders.component';

/** Golden WU orders-all-selected-on-page — allSelectedOnPage. */
describe('AdminOrdersComponent allSelectedOnPage (golden WU)', () => {
  function bare(ids: string[], selected: Set<string>): AdminOrdersComponent {
    const cmp = Object.create(AdminOrdersComponent.prototype) as AdminOrdersComponent;
    Object.assign(cmp as any, {
      orders: signal(ids.map((id) => ({ id }))),
      selectedIds: selected,
    });
    return cmp;
  }

  it('requires non-empty page with every order id selected', () => {
    expect(bare([], new Set()).allSelectedOnPage()).toBe(false);
    expect(bare(['a', 'b'], new Set(['a'])).allSelectedOnPage()).toBe(false);
    expect(bare(['a', 'b'], new Set(['a', 'b'])).allSelectedOnPage()).toBe(true);
  });
});
