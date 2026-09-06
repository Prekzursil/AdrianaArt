import { CartComponent } from './cart.component';

describe('CartComponent quote totals helpers (golden WU)', () => {
  function make(quote: Record<string, unknown>, items: unknown[] = [], subtotal = 0) {
    const cmp = Object.create(CartComponent.prototype) as CartComponent;
    (cmp as any).quote = () => quote;
    (cmp as any).items = () => items;
    (cmp as any).subtotal = () => subtotal;
    return cmp;
  }

  it('currency prefers quote then first item then RON', () => {
    expect(make({ currency: 'EUR' }).currency).toBe('EUR');
    expect(make({ currency: null }, [{ currency: 'USD' }]).currency).toBe('USD');
    expect(make({ currency: null }, []).currency).toBe('RON');
  });

  it('quoteSubtotal/Fee/Tax/Shipping/Total fall back and quoteDiscount/PromoSavings compose', () => {
    const cmp = make(
      { subtotal: 100, fee: 2, tax: 5, shipping: 10, total: 90, currency: 'RON' },
      [],
      80,
    );
    expect(cmp.quoteSubtotal()).toBe(100);
    expect(cmp.quoteFee()).toBe(2);
    expect(cmp.quoteTax()).toBe(5);
    expect(cmp.quoteShipping()).toBe(10);
    expect(cmp.quoteTotal()).toBe(90);
    expect(cmp.quoteDiscount()).toBe(27); // 100+2+5+10-90
    (cmp as any).appliedCouponOffer = null;
    (cmp as any).promo = '';
    expect(cmp.quotePromoSavings()).toBe(27);

    const fallback = make({ subtotal: 0, fee: null, tax: null, shipping: null, total: 0 }, [], 42);
    expect(fallback.quoteSubtotal()).toBe(42);
    expect(fallback.quoteFee()).toBe(0);
    expect(fallback.quoteTax()).toBe(0);
    expect(fallback.quoteShipping()).toBe(0);
    expect(fallback.quoteTotal()).toBe(42);
  });
});
