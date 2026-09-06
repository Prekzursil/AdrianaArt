import { AdminCouponsComponent } from './admin-coupons.component';

/** Golden WU coupons-email-parse-helpers. */
describe('AdminCouponsComponent email parse helpers (golden WU)', () => {
  function bare(): AdminCouponsComponent {
    return Object.create(AdminCouponsComponent.prototype) as AdminCouponsComponent;
  }

  it('isValidEmail gates empty/malformed addresses', () => {
    const fn = (AdminCouponsComponent.prototype as any).isValidEmail.bind(bare());
    expect(fn('')).toBe(false);
    expect(fn('nope')).toBe(false);
    expect(fn('a@b')).toBe(false);
    expect(fn('a@b.com')).toBe(true);
  });

  it('parseEmailsFromCsv skips header, invalids, duplicates, truncates', () => {
    const fn = (AdminCouponsComponent.prototype as any).parseEmailsFromCsv.bind(bare());
    const res = fn('email\na@b.com\nbad\na@b.com\nc@d.io');
    expect(res.emails).toEqual(['a@b.com', 'c@d.io']);
    expect(res.invalid).toEqual(['bad']);
    expect(res.duplicates).toBe(1);
    expect(res.truncated).toBe(0);
  });
});
