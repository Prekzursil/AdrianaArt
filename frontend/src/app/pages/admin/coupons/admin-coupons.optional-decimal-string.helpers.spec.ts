import { AdminCouponsComponent } from './admin-coupons.component';

/** Golden WU coupons-optional-decimal-string -- optionalDecimalString. */
describe('AdminCouponsComponent optionalDecimalString (golden WU)', () => {
  it('stringifies finite numbers and trims non-empty strings', () => {
    const cmp = Object.create(AdminCouponsComponent.prototype) as AdminCouponsComponent;
    expect((cmp as any).optionalDecimalString(2.5)).toBe('2.5');
    expect((cmp as any).optionalDecimalString(' 1.00 ')).toBe('1.00');
    expect((cmp as any).optionalDecimalString('')).toBeNull();
    expect((cmp as any).optionalDecimalString('   ')).toBeNull();
    expect((cmp as any).optionalDecimalString(Number.NaN)).toBeNull();
    expect((cmp as any).optionalDecimalString(null)).toBeNull();
  });
});
