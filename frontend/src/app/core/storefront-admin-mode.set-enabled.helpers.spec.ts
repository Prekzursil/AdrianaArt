import { StorefrontAdminModeService } from './storefront-admin-mode.service';

/** Golden WU storefront-admin-mode-set-enabled — setEnabled. */
describe('StorefrontAdminModeService setEnabled (golden WU)', () => {
  it('no-ops enabling when unavailable; otherwise sets and saves', () => {
    const svc = Object.create(StorefrontAdminModeService.prototype) as StorefrontAdminModeService;
    const calls: any[] = [];
    Object.assign(svc as any, {
      available: () => false,
      enabledSignal: { set: (v: boolean) => calls.push(['set', v]) },
      save: (v: boolean) => calls.push(['save', v]),
    });
    svc.setEnabled(true);
    expect(calls).toEqual([]);

    Object.assign(svc as any, { available: () => true });
    svc.setEnabled(true);
    expect(calls).toEqual([
      ['set', true],
      ['save', true],
    ]);
  });
});
