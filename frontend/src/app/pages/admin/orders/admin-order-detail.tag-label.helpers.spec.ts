import { AdminOrderDetailComponent } from './admin-order-detail.component';

/** Golden WU order-detail-tag-label — tagLabel. */
describe('AdminOrderDetailComponent tagLabel (golden WU)', () => {
  it('translates known tags and falls back to raw tag', () => {
    const cmp = Object.create(AdminOrderDetailComponent.prototype) as AdminOrderDetailComponent;
    (cmp as any).translate = {
      instant: (k: string) => (k === 'adminUi.orders.tags.vip' ? 'VIP' : k),
    };
    expect(cmp.tagLabel('vip')).toBe('VIP');
    expect(cmp.tagLabel('custom')).toBe('custom');
  });
});
