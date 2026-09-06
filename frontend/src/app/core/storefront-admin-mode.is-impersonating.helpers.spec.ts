import { StorefrontAdminModeService } from './storefront-admin-mode.service';

/** Golden WU storefront-admin-mode-is-impersonating — isImpersonating. */
describe('StorefrontAdminModeService isImpersonating (golden WU)', () => {
  it('invokes function or reads boolean isImpersonating on auth', () => {
    const svc = Object.create(
      StorefrontAdminModeService.prototype,
    ) as StorefrontAdminModeService;
    Object.assign(svc as any, { auth: { isImpersonating: () => true } });
    expect((svc as any).isImpersonating()).toBe(true);
    Object.assign(svc as any, { auth: { isImpersonating: false } });
    expect((svc as any).isImpersonating()).toBe(false);
    Object.assign(svc as any, { auth: { isImpersonating: true } });
    expect((svc as any).isImpersonating()).toBe(true);
    Object.assign(svc as any, { auth: null });
    expect((svc as any).isImpersonating()).toBe(false);
  });
});
