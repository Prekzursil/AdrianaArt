import { CheckoutComponent } from './checkout.component';

/** Golden WU checkout-set-payment-method -- setPaymentMethod. */
describe('CheckoutComponent setPaymentMethod (golden WU)', () => {
  it('saves available methods and surfaces not-ready otherwise', () => {
    const cmp = Object.create(CheckoutComponent.prototype) as CheckoutComponent;
    Object.assign(cmp as any, {
      paymentMethod: 'cod',
      errorMessage: 'err',
      paymentNotReady: false,
      isPaymentMethodAvailable: (m: string) => m === 'paypal',
      showPaymentNotReady: jasmine.createSpy('showPaymentNotReady'),
      checkoutPrefs: { savePaymentMethod: jasmine.createSpy('savePaymentMethod') },
    });

    cmp.setPaymentMethod('stripe' as any);
    expect((cmp as any).showPaymentNotReady).toHaveBeenCalled();
    expect((cmp as any).paymentMethod).toBe('cod');

    cmp.setPaymentMethod('paypal' as any);
    expect((cmp as any).paymentMethod).toBe('paypal');
    expect((cmp as any).errorMessage).toBe('');
    expect((cmp as any).paymentNotReady).toBe(false);
    expect((cmp as any).checkoutPrefs.savePaymentMethod).toHaveBeenCalledWith('paypal');
  });
});
