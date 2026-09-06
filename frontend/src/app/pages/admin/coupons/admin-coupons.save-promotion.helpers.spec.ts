import { AdminCouponsComponent } from './admin-coupons.component';

/** Golden WU admin-coupons-save-promotion -- savePromotion. */
describe('AdminCouponsComponent savePromotion (golden WU)', () => {
  it('toasts validation error and returns without saving', () => {
    const cmp = Object.create(AdminCouponsComponent.prototype) as AdminCouponsComponent;
    Object.assign(cmp as any, {
      validatePromotionForm: jasmine.createSpy('validate').and.returnValue('bad'),
      toast: { error: jasmine.createSpy('error') },
      t: jasmine.createSpy('t').and.returnValue('validation'),
      promotionPayloadFromForm: jasmine.createSpy('payload'),
      promotionSaving: { set: jasmine.createSpy('saving') },
    });
    cmp.savePromotion();
    expect((cmp as any).toast.error).toHaveBeenCalledWith('validation', 'bad');
    expect((cmp as any).promotionPayloadFromForm).not.toHaveBeenCalled();
    expect((cmp as any).promotionSaving.set).not.toHaveBeenCalled();
  });
});
