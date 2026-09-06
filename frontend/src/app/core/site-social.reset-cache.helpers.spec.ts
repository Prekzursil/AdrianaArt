import { SiteSocialService } from './site-social.service';

/** Golden WU site-social-reset-cache -- resetCache. */
describe('SiteSocialService resetCache (golden WU)', () => {
  it('clears the cached observable', () => {
    const svc = Object.create(SiteSocialService.prototype) as SiteSocialService;
    Object.assign(svc as any, { cached$: {} });
    svc.resetCache();
    expect((svc as any).cached$).toBeUndefined();
  });
});
