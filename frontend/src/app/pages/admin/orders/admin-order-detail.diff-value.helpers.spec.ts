import { AdminOrderDetailComponent } from './admin-order-detail.component';

/** Golden WU admin-order-detail-diff-value -- diffValue. */
describe('AdminOrderDetailComponent diffValue (golden WU)', () => {
  it('renders em dash for empty and translates status labels', () => {
    const cmp = Object.create(
      AdminOrderDetailComponent.prototype,
    ) as AdminOrderDetailComponent;
    (cmp as any).translate = {
      instant: (k: string) => (k === 'adminUi.orders.paid' ? 'Paid' : k),
    };
    expect((cmp as any).diffValue('status', null)).toBe('—');
    expect((cmp as any).diffValue('status', '')).toBe('—');
    expect((cmp as any).diffValue('status', 'paid')).toBe('Paid');
    expect((cmp as any).diffValue('tracking_number', 'ABC')).toBe('ABC');
    expect((cmp as any).diffValue('meta', { a: 1 })).toBe('—');
  });
});
