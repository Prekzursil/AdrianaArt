import { AdminOrderDetailComponent } from './admin-order-detail.component';

/** Golden WU admin-order-detail-close-refund-wizard -- closeRefundWizard. */
describe('AdminOrderDetailComponent closeRefundWizard (golden WU)', () => {
  it('closes wizard and clears note/error', () => {
    const cmp = Object.create(AdminOrderDetailComponent.prototype) as AdminOrderDetailComponent;
    Object.assign(cmp as any, {
      refundWizardOpen: { set: jasmine.createSpy('openSet') },
      refundWizardError: { set: jasmine.createSpy('errSet') },
      refundNote: 'n',
    });
    cmp.closeRefundWizard();
    expect((cmp as any).refundWizardOpen.set).toHaveBeenCalledWith(false);
    expect((cmp as any).refundWizardError.set).toHaveBeenCalledWith(null);
    expect((cmp as any).refundNote).toBe('');
  });
});
