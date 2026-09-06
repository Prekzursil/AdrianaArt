import { signal } from '@angular/core';
import { AdminOrdersComponent } from './admin-orders.component';

/** Golden WU orders-cell-padding-class — cellPaddingClass. */
describe('AdminOrdersComponent cellPaddingClass (golden WU)', () => {
  function bare(density: 'compact' | 'comfortable'): AdminOrdersComponent {
    const cmp = Object.create(AdminOrdersComponent.prototype) as AdminOrdersComponent;
    Object.assign(cmp as any, { tableLayout: signal({ density }) });
    return cmp;
  }

  it('maps density to padding classes', () => {
    expect(bare('compact').cellPaddingClass()).toBe('px-3 py-1.5');
    expect(bare('comfortable').cellPaddingClass()).toBe('px-3 py-2');
  });
});
