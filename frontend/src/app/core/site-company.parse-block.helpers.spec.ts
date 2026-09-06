import { SiteCompanyService } from './site-company.service';

/** Golden WU site-company-parse-block — parseBlock. */
describe('SiteCompanyService parseBlock (golden WU)', () => {
  it('cleans company meta fields into SiteCompanyInfo', () => {
    const svc = Object.create(SiteCompanyService.prototype) as SiteCompanyService;
    Object.assign(svc as any, {
      clean: (v: unknown) => (typeof v === 'string' ? v.trim() || null : null),
    });
    const out = (svc as any).parseBlock({
      meta: {
        company: {
          name: ' Acme ',
          registration_number: ' J40 ',
          cui: ' RO1 ',
          address: ' Str ',
          phone: ' 07 ',
          email: ' a@b.c ',
        },
      },
    });
    expect(out).toEqual({
      name: 'Acme',
      registrationNumber: 'J40',
      cui: 'RO1',
      address: 'Str',
      phone: '07',
      email: 'a@b.c',
    });
  });
});
