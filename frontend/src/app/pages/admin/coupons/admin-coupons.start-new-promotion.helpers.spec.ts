import { AdminCouponsComponent } from './admin-coupons.component';

/** Golden WU admin-coupons-start-new-promotion -- startNewPromotion. */
describe('AdminCouponsComponent startNewPromotion (golden WU)', () => {
  it('invokes without throwing when dependencies are stubbed', () => {
    const cmp = Object.create(AdminCouponsComponent.prototype) as AdminCouponsComponent;
    Object.assign(cmp as any, {
      toast: { error: jasmine.createSpy('e'), success: jasmine.createSpy('s'), info: jasmine.createSpy('i') },
      t: (k: string) => k,
      translate: { instant: (k: string) => k },
      load: jasmine.createSpy('load'),
      save: jasmine.createSpy('save'),
      router: { navigate: jasmine.createSpy('nav') },
      cdr: { markForCheck: jasmine.createSpy('mfc') },
      draft: jasmine.createSpy('draft').and.returnValue(null),
      original: jasmine.createSpy('original').and.returnValue(null),
      selectedIds: jasmine.createSpy('selectedIds').and.returnValue(new Set()),
      items: jasmine.createSpy('items').and.returnValue([]),
      busy: jasmine.createSpy('busy').and.returnValue(false),
      loading: jasmine.createSpy('loading').and.returnValue(false),
      notifications: jasmine.createSpy('notifications').and.returnValue([]),
      density: jasmine.createSpy('density').and.returnValue('comfortable'),
      columns: jasmine.createSpy('columns').and.returnValue([]),
      views: jasmine.createSpy('views').and.returnValue([]),
      currentView: jasmine.createSpy('currentView').and.returnValue(null),
      promotions: jasmine.createSpy('promotions').and.returnValue([]),
      selectedPromotion: jasmine.createSpy('selectedPromotion').and.returnValue(null),
      wishlist: jasmine.createSpy('wishlist').and.returnValue([]),
      backInStockStatus: jasmine.createSpy('backInStockStatus').and.returnValue({}),
    });
    expect(() => (cmp as any).startNewPromotion()).not.toThrow();
  });
});
