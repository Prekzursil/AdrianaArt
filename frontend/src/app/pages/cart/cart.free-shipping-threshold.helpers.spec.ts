import { CartComponent } from './cart.component';

describe('CartComponent freeShippingThreshold (golden WU)', () => {
  function make(threshold: unknown) {
    const cmp = Object.create(CartComponent.prototype) as CartComponent;
    (cmp as any).quote = () => ({ freeShippingThresholdRon: threshold });
    return cmp;
  }

  it('returns null for null/non-finite/negative; otherwise the threshold', () => {
    expect(make(null).freeShippingThreshold()).toBeNull();
    expect(make(Number.NaN).freeShippingThreshold()).toBeNull();
    expect(make(-1).freeShippingThreshold()).toBeNull();
    expect(make(0).freeShippingThreshold()).toBe(0);
    expect(make(150).freeShippingThreshold()).toBe(150);
  });
});
