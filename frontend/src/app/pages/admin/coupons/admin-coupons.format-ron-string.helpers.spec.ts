import { AdminCouponsComponent } from './admin-coupons.component';

/** Golden WU coupons-format-ron-string — formatRonString. */
describe('AdminCouponsComponent formatRonString (golden WU)', () => {
  it('delegates through optionalNumber then formatRon', () => {
    const cmp = Object.create(AdminCouponsComponent.prototype) as AdminCouponsComponent;
    const seen: unknown[] = [];
    (cmp as any).optionalNumber = (v: unknown) => {
      seen.push(v);
      return v === '12.5' ? 12.5 : null;
    };
    (cmp as any).formatRon = (n: number | null) => (n === null ? '—' : `${n.toFixed(2)} RON`);
    expect(cmp.formatRonString('12.5')).toBe('12.50 RON');
    expect(cmp.formatRonString('x')).toBe('—');
    expect(seen).toEqual(['12.5', 'x']);
  });
});
