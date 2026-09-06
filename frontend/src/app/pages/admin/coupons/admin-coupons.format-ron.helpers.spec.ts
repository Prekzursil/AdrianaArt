import { AdminCouponsComponent } from './admin-coupons.component';

/** Golden WU coupons-format-ron-helpers. */
describe('AdminCouponsComponent formatRon helpers (golden WU)', () => {
  function bare(): AdminCouponsComponent {
    const cmp = Object.create(AdminCouponsComponent.prototype) as AdminCouponsComponent;
    Object.assign(cmp as any, {
      optionalNumber: (v: any) => {
        if (v == null || v === '') return null;
        const n = Number(v);
        return Number.isFinite(n) ? n : null;
      },
    });
    return cmp;
  }

  it('formatRon / formatRonString', () => {
    const cmp = bare();
    expect(cmp.formatRon(null)).toBe('—');
    expect(cmp.formatRon(Number.NaN)).toBe('—');
    expect(cmp.formatRon(12)).toBe('12.00 RON');
    expect(cmp.formatRonString('3.5')).toBe('3.50 RON');
    expect(cmp.formatRonString('')).toBe('—');
  });
});
