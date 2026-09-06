import { CartComponent } from './cart.component';

describe('CartComponent freeShippingAppliedByCoupon (golden WU)', () => {
  it('true when couponShippingDiscount > 0', () => {
    const cmp = Object.create(CartComponent.prototype) as CartComponent;
    (cmp as any).couponShippingDiscount = () => 0;
    expect(cmp.freeShippingAppliedByCoupon()).toBe(false);
    (cmp as any).couponShippingDiscount = () => 12.5;
    expect(cmp.freeShippingAppliedByCoupon()).toBe(true);
  });
});
