import { AdminCouponsComponent } from './admin-coupons.component';

/** Golden WU admin-coupons-load-analytics -- loadAnalytics. */
describe('AdminCouponsComponent loadAnalytics (golden WU)', () => {
  it('clears analytics when no promotion selected', () => {
    const cmp = Object.create(AdminCouponsComponent.prototype) as AdminCouponsComponent;
    Object.assign(cmp as any, {
      selectedPromotion: jasmine.createSpy('promo').and.returnValue(null),
      analytics: { set: jasmine.createSpy('analytics') },
      analyticsError: { set: jasmine.createSpy('err') },
      analyticsLoading: { set: jasmine.createSpy('loading') },
      adminCoupons: { getAnalytics: jasmine.createSpy('get') },
    });
    cmp.loadAnalytics();
    expect((cmp as any).analytics.set).toHaveBeenCalledWith(null);
    expect((cmp as any).analyticsError.set).toHaveBeenCalledWith(null);
    expect((cmp as any).analyticsLoading.set).toHaveBeenCalledWith(false);
    expect((cmp as any).adminCoupons.getAnalytics).not.toHaveBeenCalled();
  });
});
