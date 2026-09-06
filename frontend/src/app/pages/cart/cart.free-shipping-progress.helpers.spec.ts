import { CartComponent } from './cart.component';

describe('CartComponent freeShippingProgressPct (golden WU)', () => {
  it('0 without threshold; 100 when threshold<=0; otherwise clamped percent', () => {
    const cmp = Object.create(CartComponent.prototype) as CartComponent;
    spyOn(cmp, 'freeShippingThreshold').and.returnValue(null);
    expect(cmp.freeShippingProgressPct()).toBe(0);

    (cmp.freeShippingThreshold as jasmine.Spy).and.returnValue(0);
    expect(cmp.freeShippingProgressPct()).toBe(100);

    (cmp.freeShippingThreshold as jasmine.Spy).and.returnValue(100);
    spyOn(cmp, 'quoteSubtotal').and.returnValue(40);
    spyOn(cmp, 'quoteDiscount').and.returnValue(0);
    expect(cmp.freeShippingProgressPct()).toBe(40);

    (cmp.quoteSubtotal as jasmine.Spy).and.returnValue(250);
    expect(cmp.freeShippingProgressPct()).toBe(100);
  });
});
