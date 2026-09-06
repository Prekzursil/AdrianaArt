import { AdminCouponsComponent } from './admin-coupons.component';

/** Golden WU coupons-optional-number -- optionalNumber. */
describe('AdminCouponsComponent optionalNumber (golden WU)', () => {
  it('parses finite numbers and numeric strings', () => {
    const cmp = Object.create(AdminCouponsComponent.prototype) as AdminCouponsComponent;
    expect((cmp as any).optionalNumber(4.5)).toBe(4.5);
    expect((cmp as any).optionalNumber(' 9 ')).toBe(9);
    expect((cmp as any).optionalNumber('')).toBeNull();
    expect((cmp as any).optionalNumber('x')).toBeNull();
    expect((cmp as any).optionalNumber(Number.NaN)).toBeNull();
    expect((cmp as any).optionalNumber({})).toBeNull();
  });
});
