import { CheckoutComponent } from './checkout.component';

/** Golden WU checkout-quote-totals — quote* accessors and promo savings. */
describe('CheckoutComponent quote totals helpers (golden WU)', () => {
  function createCmp(overrides: Record<string, unknown> = {}): CheckoutComponent {
    const cmp = Object.create(CheckoutComponent.prototype) as CheckoutComponent;
    (cmp as any).quote = null;
    (cmp as any).subtotal = jasmine.createSpy('subtotal').and.returnValue(10);
    (cmp as any).couponShippingDiscount = jasmine.createSpy('couponShippingDiscount').and.returnValue(0);
    Object.assign(cmp as any, overrides);
    return cmp;
  }

  it('quote accessors fall back when quote missing', () => {
    const cmp = createCmp();
    expect(cmp.quoteSubtotal()).toBe(10);
    expect(cmp.quoteTax()).toBe(0);
    expect(cmp.quoteShipping()).toBe(0);
    expect(cmp.quoteFee()).toBe(0);
    expect(cmp.quoteTotal()).toBe(10);
    expect(cmp.quoteDiscount()).toBe(0);
  });

  it('quote accessors read quote fields when present', () => {
    const cmp = createCmp({
      quote: { subtotal: 100, tax: 19, shipping: 15, fee: 2, total: 120 },
    });
    expect(cmp.quoteSubtotal()).toBe(100);
    expect(cmp.quoteTax()).toBe(19);
    expect(cmp.quoteShipping()).toBe(15);
    expect(cmp.quoteFee()).toBe(2);
    expect(cmp.quoteTotal()).toBe(120);
    // discount = max(0, 100+2+19+15-120) = 16
    expect(cmp.quoteDiscount()).toBe(16);
  });

  it('quotePromoSavings combines discount and coupon shipping discount', () => {
    const cmp = createCmp({
      quote: { subtotal: 50, tax: 0, shipping: 10, fee: 0, total: 40 },
      couponShippingDiscount: jasmine.createSpy('couponShippingDiscount').and.returnValue(5),
    });
    // discount = 50+0+0+10-40 = 20; promo = 20+5 = 25
    expect(cmp.quotePromoSavings()).toBe(25);
  });
});
