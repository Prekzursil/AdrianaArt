import { SiteNavigationService } from './site-navigation.service';

/** Golden WU site-navigation-reset-cache -- resetCache. */
describe('SiteNavigationService resetCache (golden WU)', () => {
  it('clears the cached observable', () => {
    const svc = Object.create(SiteNavigationService.prototype) as SiteNavigationService;
    Object.assign(svc as any, { cached$: {} });
    svc.resetCache();
    expect((svc as any).cached$).toBeUndefined();
  });
});
