import { CheckoutComponent } from './checkout.component';

/** Golden WU checkout-quote-subtotal — quoteSubtotal. */
describe('CheckoutComponent quoteSubtotal (golden WU)', () => {
  function bare(quote: any, cartSubtotal: number): CheckoutComponent {
    const cmp = Object.create(CheckoutComponent.prototype) as CheckoutComponent;
    Object.assign(cmp as any, {
      quote,
      subtotal: () => cartSubtotal,
    });
    return cmp;
  }

  it('prefers quote.subtotal else cart subtotal', () => {
    expect(bare({ subtotal: 55 }, 10).quoteSubtotal()).toBe(55);
    expect(bare(null, 10).quoteSubtotal()).toBe(10);
    expect(bare({}, 10).quoteSubtotal()).toBe(10);
  });
});
