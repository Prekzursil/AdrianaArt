import { CartComponent } from './cart.component';

describe('CartComponent freeShippingRemaining (golden WU)', () => {
  it('null without threshold; otherwise max(0, threshold - taxable)', () => {
    const cmp = Object.create(CartComponent.prototype) as CartComponent;
    spyOn(cmp, 'freeShippingThreshold').and.returnValue(null);
    expect(cmp.freeShippingRemaining()).toBeNull();

    (cmp.freeShippingThreshold as jasmine.Spy).and.returnValue(100);
    spyOn(cmp, 'quoteSubtotal').and.returnValue(40);
    spyOn(cmp, 'quoteDiscount').and.returnValue(5);
    expect(cmp.freeShippingRemaining()).toBe(65);

    (cmp.quoteSubtotal as jasmine.Spy).and.returnValue(200);
    (cmp.quoteDiscount as jasmine.Spy).and.returnValue(10);
    expect(cmp.freeShippingRemaining()).toBe(0);
  });
});
