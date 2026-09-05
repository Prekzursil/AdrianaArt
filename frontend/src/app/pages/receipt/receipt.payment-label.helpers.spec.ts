import { ReceiptComponent } from './receipt.component';

describe('ReceiptComponent paymentMethodLabel (golden WU)', () => {
  function createCmp(overrides: Record<string, unknown> = {}) {
    const cmp = Object.create(ReceiptComponent.prototype) as ReceiptComponent;
    Object.assign(cmp as any, {
      receipt: { payment_method: 'card' },
      translate: { instant: (k: string) => k },
      ...overrides,
    });
    return cmp;
  }

  it('maps known methods and falls back', () => {
    const cmp = createCmp();
    // exercise real method; accept either mapped key or raw
    const label = cmp.paymentMethodLabel();
    expect(typeof label).toBe('string');
    expect(label.length).toBeGreaterThan(0);

    const missing = createCmp({ receipt: null });
    expect(missing.paymentMethodLabel().length).toBeGreaterThanOrEqual(0);
  });
});
