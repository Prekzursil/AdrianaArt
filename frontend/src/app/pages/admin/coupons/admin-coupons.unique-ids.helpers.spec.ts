import { AdminCouponsComponent } from './admin-coupons.component';

/** Golden WU coupons-unique-ids — uniqueIds. */
describe('AdminCouponsComponent uniqueIds (golden WU)', () => {
  it('dedupes and drops empties preserving order', () => {
    const cmp = Object.create(AdminCouponsComponent.prototype) as any;
    expect(cmp.uniqueIds(['a', '', 'b', 'a', null as any])).toEqual(['a', 'b']);
    expect(cmp.uniqueIds(null as any)).toEqual([]);
  });
});
