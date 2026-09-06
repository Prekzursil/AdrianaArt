import { AdminOrderDetailComponent } from './admin-order-detail.component';

/** Golden WU order-detail-refund-helpers. */
describe('AdminOrderDetailComponent refund helpers (golden WU)', () => {
  function bare(overrides: Record<string, unknown> = {}): AdminOrderDetailComponent {
    const cmp = Object.create(AdminOrderDetailComponent.prototype) as AdminOrderDetailComponent;
    Object.assign(cmp as any, {
      order: () => null,
      partialRefundQty: {},
      translate: { instant: (k: string) => k },
      ...overrides,
    });
    return cmp;
  }

  it('refundsTotal sums refund amounts', () => {
    const cmp = bare();
    expect(cmp.refundsTotal()).toBe(0);
    (cmp as any).order = () => ({ refunds: [{ amount: 10 }, { amount: '2.5' }, {}] });
    expect(cmp.refundsTotal()).toBe(12.5);
  });

  it('refundableRemaining clamps total_amount - refundsTotal', () => {
    const cmp = bare({ refundsTotal: () => 30 });
    (cmp as any).order = () => ({ total_amount: 100 });
    expect(cmp.refundableRemaining()).toBe(70);
    (cmp as any).order = () => ({ total_amount: 10 });
    expect(cmp.refundableRemaining()).toBe(0);
  });

  it('partialRefundQtyFor reads qty map', () => {
    const cmp = bare({ partialRefundQty: { a: 2, b: '3' } });
    expect(cmp.partialRefundQtyFor('a')).toBe(2);
    expect(cmp.partialRefundQtyFor('b')).toBe(3);
    expect(cmp.partialRefundQtyFor('missing')).toBe(0);
  });

  it('partialRefundLineTotal multiplies qty * unit_price', () => {
    const cmp = bare({ partialRefundQtyFor: (id: string) => (id === 'i1' ? 3 : 0) });
    expect(cmp.partialRefundLineTotal({ id: 'i1', unit_price: 4 } as any)).toBe(12);
    expect(cmp.partialRefundLineTotal({ id: 'i2', unit_price: 9 } as any)).toBe(0);
  });

  it('partialRefundSelectionTotal sums line totals', () => {
    const cmp = bare({
      partialRefundLineTotal: (it: any) => Number(it.unit_price ?? 0),
    });
    expect(cmp.partialRefundSelectionTotal({ items: [{ unit_price: 1 }, { unit_price: 2 }] } as any)).toBe(3);
    expect(cmp.partialRefundSelectionTotal({} as any)).toBe(0);
  });

  it('processPartialRefundHint picks translate keys', () => {
    const cmp = bare();
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
