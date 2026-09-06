import { CartComponent } from './cart.component';

/** Golden WU cart-load-recommendations -- loadRecommendations. */
describe('CartComponent loadRecommendations (golden WU)', () => {
  it('invokes with a stubbed argument without throwing', () => {
    const cmp = Object.create(CartComponent.prototype) as CartComponent;
    Object.assign(cmp as any, {
      toast: { error: jasmine.createSpy('e'), success: jasmine.createSpy('s') },
      t: (k: string) => k,
      translate: { instant: (k: string) => k },
      load: jasmine.createSpy('load'),
      router: { navigate: jasmine.createSpy('nav') },
      cdr: { markForCheck: jasmine.createSpy('mfc') },
    });
    expect(() => (cmp as any).loadRecommendations(new Set())).not.toThrow();
  });
});
