import { AdminOrderDetailComponent } from './admin-order-detail.component';

/** Golden WU order-detail-payment-capture-blocked — paymentCaptureBlocked. */
describe('AdminOrderDetailComponent paymentCaptureBlocked (golden WU)', () => {
  it('blocks only pending_acceptance stripe/paypal without capture', () => {
    const cmp = Object.create(AdminOrderDetailComponent.prototype) as AdminOrderDetailComponent;
    (cmp as any).statusValue = 'pending_acceptance';
    (cmp as any).hasPaymentCaptured = () => false;
    (cmp as any).order = () => null;
    expect(cmp.paymentCaptureBlocked()).toBe(false);

    (cmp as any).order = () => ({ status: 'pending_acceptance', payment_method: 'stripe' });
    expect(cmp.paymentCaptureBlocked()).toBe(true);

    (cmp as any).hasPaymentCaptured = () => true;
    expect(cmp.paymentCaptureBlocked()).toBe(false);

    (cmp as any).hasPaymentCaptured = () => false;
    (cmp as any).order = () => ({ status: 'paid', payment_method: 'stripe' });
    expect(cmp.paymentCaptureBlocked()).toBe(false);

    (cmp as any).order = () => ({ status: 'pending_acceptance', payment_method: 'cod' });
    expect(cmp.paymentCaptureBlocked()).toBe(false);
  });
});
