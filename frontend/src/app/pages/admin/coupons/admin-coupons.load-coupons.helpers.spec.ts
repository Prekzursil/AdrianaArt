import { AdminCouponsComponent } from './admin-coupons.component';

/** Golden WU admin-coupons-load-coupons -- loadCoupons. */
describe('AdminCouponsComponent loadCoupons (golden WU)', () => {
  it('clears coupons when no promotion selected', () => {
    const cmp = Object.create(AdminCouponsComponent.prototype) as AdminCouponsComponent;
    Object.assign(cmp as any, {
      selectedPromotion: jasmine.createSpy('promo').and.returnValue(null),
      coupons: { set: jasmine.createSpy('set') },
      couponsLoading: { set: jasmine.createSpy('loading') },
      adminCoupons: { listCoupons: jasmine.createSpy('list') },
    });
    cmp.loadCoupons();
    expect((cmp as any).coupons.set).toHaveBeenCalledWith([]);
    expect((cmp as any).adminCoupons.listCoupons).not.toHaveBeenCalled();
  });
});
