import { ReceiptService } from './receipt.service';

/** Golden WU receipt-pdf-url — pdfUrl. */
describe('ReceiptService pdfUrl (golden WU)', () => {
  it('builds pdf path and optional reveal query', () => {
    const svc = Object.create(ReceiptService.prototype) as ReceiptService;
    Object.assign(svc as any, { apiBaseUrl: 'https://api.example.test' });
    expect(svc.pdfUrl('tok/1')).toBe('https://api.example.test/orders/receipt/tok%2F1/pdf');
    expect(svc.pdfUrl('abc', { reveal: true })).toBe(
      'https://api.example.test/orders/receipt/abc/pdf?reveal=true',
    );
  });
});
