import { ReceiptComponent } from './receipt.component';

describe('ReceiptComponent paymentMethodLabel + toggleReveal (golden WU)', () => {
  function make(overrides: Record<string, unknown> = {}): any {
    const proto = Object.create(ReceiptComponent.prototype);
    Object.assign(proto, {
      receipt: null,
      token: '',
      reveal: false,
      loadReceipt: jasmine.createSpy('loadReceipt'),
      ...overrides,
    });
    return proto;
  }

  describe('paymentMethodLabel', () => {
    it('maps known methods and uppercases unknown', () => {
      expect(make({ receipt: { payment_method: 'stripe' } }).paymentMethodLabel()).toBe('Stripe');
      expect(make({ receipt: { payment_method: 'PayPal' } }).paymentMethodLabel()).toBe('PayPal');
      expect(make({ receipt: { payment_method: 'netopia' } }).paymentMethodLabel()).toBe('Netopia');
      expect(make({ receipt: { payment_method: 'cod' } }).paymentMethodLabel()).toBe('Cash / Numerar');
      expect(make({ receipt: { payment_method: 'wire' } }).paymentMethodLabel()).toBe('WIRE');
    });

    it('returns empty when receipt/method missing or blank', () => {
      expect(make({ receipt: null }).paymentMethodLabel()).toBe('');
      expect(make({ receipt: { payment_method: '' } }).paymentMethodLabel()).toBe('');
      expect(make({ receipt: { payment_method: '  ' } }).paymentMethodLabel()).toBe('');
    });
  });

  describe('toggleReveal', () => {
    it('no-ops without token', () => {
      const c = make({ token: '', reveal: false });
      c.toggleReveal();
      expect(c.reveal).toBe(false);
      expect(c.loadReceipt).not.toHaveBeenCalled();
    });

    it('flips reveal and reloads when token set', () => {
      const c = make({ token: 'abc', reveal: false });
      c.toggleReveal();
      expect(c.reveal).toBe(true);
      expect(c.loadReceipt).toHaveBeenCalled();
      c.toggleReveal();
      expect(c.reveal).toBe(false);
    });
  });
});
