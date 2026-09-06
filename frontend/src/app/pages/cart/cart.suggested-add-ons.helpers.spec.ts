import { CartComponent } from './cart.component';

describe('CartComponent suggestedAddOns (golden WU)', () => {
  it('empty when remaining null/<=0; prefers under-remaining then cheapest two', () => {
    const cmp = Object.create(CartComponent.prototype) as CartComponent;
    spyOn(cmp, 'freeShippingRemaining').and.returnValue(null);
    expect(cmp.suggestedAddOns()).toEqual([]);

    (cmp.freeShippingRemaining as jasmine.Spy).and.returnValue(0);
    expect(cmp.suggestedAddOns()).toEqual([]);

    (cmp.freeShippingRemaining as jasmine.Spy).and.returnValue(30);
    (cmp as any).recommendations = [
      { id: 'a', base_price: 50 },
      { id: 'b', base_price: 20 },
      { id: 'c', base_price: 25 },
      { id: 'd', base_price: 10 },
    ];
    spyOn(cmp, 'displayProductPrice').and.callFake((p: any) => p.base_price);
    const out = cmp.suggestedAddOns();
    expect(out.map((p: any) => p.id)).toEqual(['d', 'b']);
  });
});
