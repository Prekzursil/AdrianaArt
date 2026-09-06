import { CheckoutComponent } from './checkout.component';

/** Golden WU checkout-scroll-to-step -- scrollToStep. */
describe('CheckoutComponent scrollToStep (golden WU)', () => {
  it('no-ops when document is undefined', () => {
    const cmp = Object.create(CheckoutComponent.prototype) as CheckoutComponent;
    const original = (globalThis as any).document;
    try {
      Object.defineProperty(globalThis, 'document', {
        configurable: true,
        value: undefined,
      });
      expect(() => cmp.scrollToStep('step-1')).not.toThrow();
    } finally {
      Object.defineProperty(globalThis, 'document', {
        configurable: true,
        value: original,
      });
    }
  });
});
