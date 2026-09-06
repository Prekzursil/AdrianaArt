import { AdminCouponsComponent } from './admin-coupons.component';

/** Golden WU — formatRon / formatRonString money display helpers. */
describe('AdminCouponsComponent formatRon helpers (golden WU)', () => {
  function bare(): AdminCouponsComponent {
    const cmp = Object.create(AdminCouponsComponent.prototype) as AdminCouponsComponent;
    (cmp as any).optionalNumber = (value: unknown): number | null => {
      if (typeof value === 'number') return Number.isFinite(value) ? value : null;
      if (typeof value === 'string') {
        const trimmed = value.trim();
        if (!trimmed) return null;
        const num = Number(trimmed);
        return Number.isFinite(num) ? num : null;
      }
      return null;
    };
    return cmp;
  }

  it('formatRon renders dash for null/non-finite and fixed RON otherwise', () => {
    const cmp = bare();
    expect(cmp.formatRon(null)).toBe('—');
    expect(cmp.formatRon(Number.NaN)).toBe('—');
    expect(cmp.formatRon(12)).toBe('12.00 RON');
    expect(cmp.formatRon(3.5)).toBe('3.50 RON');
  });

  it('formatRonString parses via optionalNumber', () => {
    const cmp = bare();
    expect(cmp.formatRonString(null)).toBe('—');
    expect(cmp.formatRonString('')).toBe('—');
    expect(cmp.formatRonString('9.1')).toBe('9.10 RON');
    expect(cmp.formatRonString('nope')).toBe('—');
  });
});
