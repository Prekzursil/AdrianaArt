import { StorefrontAdminModeService } from './storefront-admin-mode.service';

/** Golden WU storefront-admin-mode-toggle — toggle. */
describe('StorefrontAdminModeService toggle (golden WU)', () => {
  it('flips enabled via setEnabled', () => {
    const svc = Object.create(StorefrontAdminModeService.prototype) as StorefrontAdminModeService;
    const calls: boolean[] = [];
    Object.assign(svc as any, {
      enabledSignal: () => false,
      setEnabled: (next: boolean) => calls.push(next),
    });
    svc.toggle();
    expect(calls).toEqual([true]);

    Object.assign(svc as any, { enabledSignal: () => true });
    svc.toggle();
    expect(calls).toEqual([true, false]);
  });
});
