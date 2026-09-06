import { AdminOrderDetailComponent } from './admin-order-detail.component';

/** Golden WU tip — processPartialRefundHint. */
describe('AdminOrderDetailComponent processPartialRefundHint (golden WU)', () => {
  it('picks supported/missing/unsupported translate keys', () => {
    const cmp = Object.create(AdminOrderDetailComponent.prototype) as AdminOrderDetailComponent;
    const keys: string[] = [];
    (cmp as any).translate = { instant: (k: string) => { keys.push(k); return k; } };
    (cmp as any).order = () => null;
    expect(cmp.processPartialRefundHint()).toBe('');

    (cmp as any).canProcessPartialRefund = () => true;
    (cmp as any).order = () => ({ payment_method: 'stripe' });
    expect(cmp.processPartialRefundHint()).toContain('processPaymentHintSupported');

    (cmp as any).canProcessPartialRefund = () => false;
    (cmp as any).order = () => ({ payment_method: 'stripe' });
    expect(cmp.processPartialRefundHint()).toContain('MissingStripe');
    (cmp as any).order = () => ({ payment_method: 'paypal' });
    expect(cmp.processPartialRefundHint()).toContain('MissingPaypal');
    (cmp as any).order = () => ({ payment_method: 'cod' });
    expect(cmp.processPartialRefundHint()).toContain('Unsupported');
  });
});
