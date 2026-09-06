import { SiteCompanyService } from './site-company.service';

/** Golden WU site-company-reset-cache -- resetCache. */
describe('SiteCompanyService resetCache (golden WU)', () => {
  it('clears the cached observable', () => {
    const svc = Object.create(SiteCompanyService.prototype) as SiteCompanyService;
    Object.assign(svc as any, { cached$: {} });
    svc.resetCache();
    expect((svc as any).cached$).toBeUndefined();
  });
});
