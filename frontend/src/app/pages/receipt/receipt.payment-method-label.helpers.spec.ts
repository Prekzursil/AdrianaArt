import { ReceiptComponent } from './receipt.component';

/** Golden WU receipt-payment-method-label — paymentMethodLabel arms. */
describe('ReceiptComponent paymentMethodLabel (golden WU)', () => {
  function createCmp(method: string | null | undefined) {
    const cmp = Object.create(ReceiptComponent.prototype) as ReceiptComponent;
    (cmp as any).receipt = method === undefined ? null : { payment_method: method };
    return cmp;
  }

  it('maps known methods and falls back', () => {
    expect(createCmp(null).paymentMethodLabel()).toBe('');
    expect(createCmp('').paymentMethodLabel()).toBe('');
    expect(createCmp('stripe').paymentMethodLabel()).toBe('Stripe');
    expect(createCmp('PayPal').paymentMethodLabel()).toBe('PayPal');
    expect(createCmp('netopia').paymentMethodLabel()).toBe('Netopia');
    expect(createCmp('cod').paymentMethodLabel()).toBe('Cash / Numerar');
    expect(createCmp('wire').paymentMethodLabel()).toBe('WIRE');
  });
});
