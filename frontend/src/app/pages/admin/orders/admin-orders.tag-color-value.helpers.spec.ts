import { AdminOrdersComponent } from './admin-orders.component';

/** Golden WU orders-tag-color-value — tagColorValue. */
describe('AdminOrdersComponent tagColorValue (golden WU)', () => {
  it('returns override color when present', () => {
    const cmp = Object.create(AdminOrdersComponent.prototype) as any;
    Object.assign(cmp, { tagColorOverrides: { vip: 'rose' } });
    expect(cmp.tagColorValue('vip')).toBe('rose');
  });
});
