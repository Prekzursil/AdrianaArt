import { AdminCouponsComponent } from './admin-coupons.component';

/** Golden WU coupons-product-label — productLabel. */
describe('AdminCouponsComponent productLabel (golden WU)', () => {
  it('returns cached name or raw id', () => {
    const cmp = Object.create(AdminCouponsComponent.prototype) as AdminCouponsComponent;
    (cmp as any).productCache = { p1: { name: 'Mug' } };
    expect(cmp.productLabel('p1')).toBe('Mug');
    expect(cmp.productLabel('missing')).toBe('missing');
  });
});
