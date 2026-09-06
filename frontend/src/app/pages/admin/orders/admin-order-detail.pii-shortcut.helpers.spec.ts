import { signal } from '@angular/core';
import { AdminOrderDetailComponent } from './admin-order-detail.component';

/** Golden WU order-detail-pii-shortcut-helpers. */
describe('AdminOrderDetailComponent pii/shortcut helpers (golden WU)', () => {
  function bare(overrides: Record<string, unknown> = {}): AdminOrderDetailComponent {
    const cmp = Object.create(AdminOrderDetailComponent.prototype) as AdminOrderDetailComponent;
    Object.assign(cmp as any, {
      orderId: 'o1',
      piiReveal: signal(false),
      load: jasmine.createSpy('load'),
      ...overrides,
    });
    return cmp;
  }

  it('togglePiiReveal flips and reloads', () => {
    const cmp = bare();
    cmp.togglePiiReveal();
    expect((cmp as any).piiReveal()).toBe(true);
    expect((cmp as any).load).toHaveBeenCalledWith('o1');
    bare({ orderId: '' }).togglePiiReveal();
  });

  it('shouldIgnoreShortcut skips inputs and prevented events', () => {
    const fn = (AdminOrderDetailComponent.prototype as any).shouldIgnoreShortcut.bind(bare());
    expect(fn({ defaultPrevented: true, target: null })).toBe(true);
    expect(fn({ defaultPrevented: false, target: null })).toBe(false);
    expect(fn({ defaultPrevented: false, target: { tagName: 'INPUT', isContentEditable: false } })).toBe(true);
    expect(fn({ defaultPrevented: false, target: { tagName: 'DIV', isContentEditable: false } })).toBe(false);
  });
});
