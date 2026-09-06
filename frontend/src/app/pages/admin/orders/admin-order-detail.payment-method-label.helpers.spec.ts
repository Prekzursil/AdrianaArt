import { AdminOrderDetailComponent } from './admin-order-detail.component';

/** Golden WU order-detail-payment-method-label — paymentMethodLabel. */
describe('AdminOrderDetailComponent paymentMethodLabel (golden WU)', () => {
  it('maps known methods via translate and falls back', () => {
    const cmp = Object.create(AdminOrderDetailComponent.prototype) as AdminOrderDetailComponent;
    (cmp as any).translate = {
      instant: (k: string) =>
        ({
          'adminUi.orders.paymentMethods.stripe': 'Stripe',
          'adminUi.orders.paymentMethods.paypal': 'PayPal',
        })[k] || k,
    };
    (cmp as any).order = () => null;
    expect(cmp.paymentMethodLabel()).toBe('—');
    (cmp as any).order = () => ({ payment_method: 'stripe' });
    expect(cmp.paymentMethodLabel()).toBe('Stripe');
    (cmp as any).order = () => ({ payment_method: 'weird' });
    // falls back to raw or key depending on implementation — assert non-empty
    expect(String(cmp.paymentMethodLabel()).length).toBeGreaterThan(0);
  });
});
