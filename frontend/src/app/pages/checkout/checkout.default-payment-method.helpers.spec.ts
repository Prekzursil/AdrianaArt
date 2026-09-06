import { CheckoutComponent } from './checkout.component';

/** Golden WU checkout-default-payment-method -- defaultPaymentMethod. */
describe('CheckoutComponent defaultPaymentMethod (golden WU)', () => {
  it('prefers saved available method then first candidate else cod', () => {
    const cmp = Object.create(CheckoutComponent.prototype) as CheckoutComponent;
    Object.assign(cmp as any, {
      checkoutPrefs: { tryLoadPaymentMethod: () => 'paypal' },
      isPaymentMethodAvailable: (m: string) => m === 'paypal' || m === 'cod',
    });
    expect((cmp as any).defaultPaymentMethod()).toBe('paypal');

    Object.assign(cmp as any, {
      checkoutPrefs: { tryLoadPaymentMethod: () => null },
      isPaymentMethodAvailable: (m: string) => m === 'netopia',
    });
    expect((cmp as any).defaultPaymentMethod()).toBe('netopia');

    Object.assign(cmp as any, {
      checkoutPrefs: { tryLoadPaymentMethod: () => null },
      isPaymentMethodAvailable: () => false,
    });
    expect((cmp as any).defaultPaymentMethod()).toBe('cod');
  });
});
