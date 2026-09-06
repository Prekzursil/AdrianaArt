import { AdminCouponsComponent } from './admin-coupons.component';

/** Golden WU coupons-optional-int -- optionalInt. */
describe('AdminCouponsComponent optionalInt (golden WU)', () => {
  it('truncates positive finite numbers and rejects non-positive', () => {
    const cmp = Object.create(AdminCouponsComponent.prototype) as AdminCouponsComponent;
    expect((cmp as any).optionalInt(3.9)).toBe(3);
    expect((cmp as any).optionalInt('12')).toBe(12);
    expect((cmp as any).optionalInt(0)).toBeNull();
    expect((cmp as any).optionalInt(-2)).toBeNull();
    expect((cmp as any).optionalInt('')).toBeNull();
    expect((cmp as any).optionalInt(null)).toBeNull();
  });
});
