import { ReceiptComponent } from './receipt.component';

/** Golden WU receipt-toggle-reveal-helpers. */
describe('ReceiptComponent toggleReveal (golden WU)', () => {
  function bare(overrides: Record<string, unknown> = {}): ReceiptComponent {
    const cmp = Object.create(ReceiptComponent.prototype) as ReceiptComponent;
    Object.assign(cmp as any, {
      token: 't',
      reveal: false,
      loadReceipt: jasmine.createSpy('loadReceipt'),
      ...overrides,
    });
    return cmp;
  }

  it('toggleReveal flips reveal and reloads when token set', () => {
    const cmp = bare();
    cmp.toggleReveal();
    expect((cmp as any).reveal).toBe(true);
    expect((cmp as any).loadReceipt).toHaveBeenCalled();
  });

  it('toggleReveal no-ops without token', () => {
    const cmp = bare({ token: '', reveal: false });
    cmp.toggleReveal();
    expect((cmp as any).reveal).toBe(false);
    expect((cmp as any).loadReceipt).not.toHaveBeenCalled();
  });
});
