import { ShopComponent } from './shop.component';

/** Golden WU shop-scroll-to-filters -- scrollToFilters. */
describe('ShopComponent scrollToFilters (golden WU)', () => {
  it('no-ops when document is undefined', () => {
    const cmp = Object.create(ShopComponent.prototype) as ShopComponent;
    const original = (globalThis as any).document;
    try {
      Object.defineProperty(globalThis, 'document', {
        configurable: true,
        value: undefined,
      });
      expect(() => cmp.scrollToFilters()).not.toThrow();
    } finally {
      Object.defineProperty(globalThis, 'document', {
        configurable: true,
        value: original,
      });
    }
  });
});
