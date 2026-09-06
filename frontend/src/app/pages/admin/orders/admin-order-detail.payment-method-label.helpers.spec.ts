import { AdminOrderDetailComponent } from './admin-order-detail.component';

/** Golden WU order-detail-payment-method-label — paymentMethodLabel. */
describe('AdminOrderDetailComponent paymentMethodLabel (golden WU)', () => {
  it('maps known methods via translate and falls back', () => {
    const cmp = Object.create(AdminOrderDetailComponent.prototype) as AdminOrderDetailComponent;
    (cmp as any).translate = {
      instant: (k: string) =>
        ({
          'adminUi.orders.paymentCod': 'Cash on delivery',
          'adminUi.orders.paymentPaypal': 'PayPal',
          'adminUi.orders.paymentStripe': 'Stripe',
        })[k] || k,
    };
    (cmp as any).order = () => null;
    expect(cmp.paymentMethodLabel()).toBe('—');
    (cmp as any).order = () => ({ payment_method: 'stripe' });
    expect(cmp.paymentMethodLabel()).toBe('Stripe');
    (cmp as any).order = () => ({ payment_method: 'paypal' });
    expect(cmp.paymentMethodLabel()).toBe('PayPal');
    (cmp as any).order = () => ({ payment_method: 'cod' });
    expect(cmp.paymentMethodLabel()).toBe('Cash on delivery');
    (cmp as any).order = () => ({ payment_method: 'wire' });
    expect(cmp.paymentMethodLabel()).toBe('wire');
    (cmp as any).order = () => ({ payment_method: '  ' });
    expect(cmp.paymentMethodLabel()).toBe('—');
  });
});
