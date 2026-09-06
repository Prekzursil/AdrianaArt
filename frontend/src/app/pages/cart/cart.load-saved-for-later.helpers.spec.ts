import { CartComponent } from './cart.component';

/** Golden WU cart-load-saved-for-later -- loadSavedForLater. */
describe('CartComponent loadSavedForLater (golden WU)', () => {
  it('returns from a stubbed instance without throwing', () => {
    const cmp = Object.create(CartComponent.prototype) as CartComponent;
    Object.assign(cmp as any, {
      toast: { error: jasmine.createSpy('e'), success: jasmine.createSpy('s') },
      t: (k: string) => k,
      translate: { instant: (k: string) => k },
      items: jasmine.createSpy('items').and.returnValue([]),
      cdr: { markForCheck: jasmine.createSpy('mfc') },
    });
    expect(() => (cmp as any).loadSavedForLater()).not.toThrow();
  });
});
