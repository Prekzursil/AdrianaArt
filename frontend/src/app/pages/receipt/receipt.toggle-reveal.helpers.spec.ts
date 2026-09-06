import { ReceiptComponent } from './receipt.component';

describe('ReceiptComponent toggleReveal (golden WU)', () => {
  it('noops without token; flips reveal and reloads with token', () => {
    const cmp = Object.create(ReceiptComponent.prototype) as ReceiptComponent;
    const load = jasmine.createSpy('loadReceipt');
    (cmp as any).loadReceipt = load;
    (cmp as any).token = '';
    (cmp as any).reveal = false;
    cmp.toggleReveal();
    expect(load).not.toHaveBeenCalled();
    expect((cmp as any).reveal).toBe(false);

    (cmp as any).token = 'abc';
    cmp.toggleReveal();
    expect((cmp as any).reveal).toBe(true);
    expect(load).toHaveBeenCalledTimes(1);
    cmp.toggleReveal();
    expect((cmp as any).reveal).toBe(false);
    expect(load).toHaveBeenCalledTimes(2);
  });
});
