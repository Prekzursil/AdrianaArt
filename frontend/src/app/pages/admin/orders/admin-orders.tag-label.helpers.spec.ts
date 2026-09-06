import { AdminOrdersComponent } from './admin-orders.component';

/** Golden WU orders-tag-label — tagLabel. */
describe('AdminOrdersComponent tagLabel (golden WU)', () => {
  it('returns translation when present else raw tag', () => {
    const cmp = Object.create(AdminOrdersComponent.prototype) as AdminOrdersComponent;
    (cmp as any).translate = {
      instant: (k: string) => (k.endsWith('.vip') ? 'VIP' : k),
    };
    expect(cmp.tagLabel('vip')).toBe('VIP');
    expect(cmp.tagLabel('unknown')).toBe('unknown');
  });
});
