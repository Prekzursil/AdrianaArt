import { SiteCompanyService } from './site-company.service';

/** Golden WU site-company-clean — clean. */
describe('SiteCompanyService clean (golden WU)', () => {
  it('trims strings/numbers and returns null for blanks/other', () => {
    const svc = Object.create(SiteCompanyService.prototype) as SiteCompanyService;
    expect((svc as any).clean('  Acme  ')).toBe('Acme');
    expect((svc as any).clean('   ')).toBeNull();
    expect((svc as any).clean(42)).toBe('42');
    expect((svc as any).clean(null)).toBeNull();
    expect((svc as any).clean({ x: 1 })).toBeNull();
  });
});
