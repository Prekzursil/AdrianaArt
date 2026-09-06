import { AdminOrderDetailComponent } from './admin-order-detail.component';

/** Golden WU order-detail-courier-name — courierName. */
describe('AdminOrderDetailComponent courierName (golden WU)', () => {
  it('maps known couriers and falls back to raw/dash', () => {
    const cmp = Object.create(AdminOrderDetailComponent.prototype) as AdminOrderDetailComponent;
    (cmp as any).translate = {
      instant: (k: string) =>
        ({
          'checkout.courierSameday': 'Sameday',
          'checkout.courierFanCourier': 'Fan Courier',
        })[k] || k,
    };
    expect(cmp.courierName(null)).toBe('—');
    expect(cmp.courierName('')).toBe('—');
    expect(cmp.courierName('sameday')).toBe('Sameday');
    expect(cmp.courierName('fan_courier')).toBe('Fan Courier');
    expect(cmp.courierName('Other Co')).toBe('Other Co');
  });
});
