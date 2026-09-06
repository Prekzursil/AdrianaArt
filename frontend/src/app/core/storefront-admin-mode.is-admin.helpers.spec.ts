import { StorefrontAdminModeService } from './storefront-admin-mode.service';

/** Golden WU storefront-admin-mode-is-admin — isAdmin. */
describe('StorefrontAdminModeService isAdmin (golden WU)', () => {
  it('invokes function or reads boolean isAdmin on auth', () => {
    const svc = Object.create(
      StorefrontAdminModeService.prototype,
    ) as StorefrontAdminModeService;
    Object.assign(svc as any, { auth: { isAdmin: () => true } });
    expect((svc as any).isAdmin()).toBe(true);
    Object.assign(svc as any, { auth: { isAdmin: false } });
    expect((svc as any).isAdmin()).toBe(false);
    Object.assign(svc as any, { auth: { isAdmin: true } });
    expect((svc as any).isAdmin()).toBe(true);
    Object.assign(svc as any, { auth: {} });
    expect((svc as any).isAdmin()).toBe(false);
  });
});
