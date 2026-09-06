import { ReceiptComponent } from './receipt.component';

/** Golden WU receipt-load-receipt -- loadReceipt. */
describe('ReceiptComponent loadReceipt (golden WU)', () => {
  it('sets missing-token error when token absent', () => {
    const cmp = Object.create(ReceiptComponent.prototype) as ReceiptComponent;
    Object.assign(cmp as any, { token: '', loading: true, receipt: { id: 1 }, error: '' });
    (cmp as any).loadReceipt();
    expect((cmp as any).loading).toBe(false);
    expect((cmp as any).receipt).toBeNull();
    expect((cmp as any).error).toBe('Missing receipt token.');
  });

  it('loads receipt by token when present', () => {
    const cmp = Object.create(ReceiptComponent.prototype) as ReceiptComponent;
    const data = { id: 'r1' };
    Object.assign(cmp as any, {
      token: 'abc',
      reveal: false,
      receipts: {
        pdfUrl: jasmine.createSpy('pdfUrl').and.returnValue('/pdf'),
        getByToken: jasmine.createSpy('getByToken').and.returnValue({
          subscribe: (h: any) => h.next(data),
        }),
      },
    });
    (cmp as any).loadReceipt();
    expect((cmp as any).pdfUrl).toBe('/pdf');
    expect((cmp as any).receipt).toBe(data);
    expect((cmp as any).loading).toBe(false);
  });
});
