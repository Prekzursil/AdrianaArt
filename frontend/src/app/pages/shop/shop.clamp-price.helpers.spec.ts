import { ShopComponent } from './shop.component';

/** Golden WU shop-clamp-price — clampPrice. */
describe('ShopComponent clampPrice (golden WU)', () => {
  it('clamps to bounds and snaps to step', () => {
    const cmp = Object.create(ShopComponent.prototype) as ShopComponent;
    (cmp as any).priceMinBound = 0;
    (cmp as any).priceMaxBound = 1000;
    (cmp as any).priceStep = 5;
    const fn = (ShopComponent.prototype as any).clampPrice as (this: ShopComponent, v: number) => number;
    expect(fn.call(cmp, Number.NaN)).toBe(0);
    expect(fn.call(cmp, -10)).toBe(0);
    expect(fn.call(cmp, 2000)).toBe(1000);
    expect(fn.call(cmp, 12)).toBe(10);
    expect(fn.call(cmp, 13)).toBe(15);
  });
});
