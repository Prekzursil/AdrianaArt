import { FxRatesService } from './fx-rates.service';

/** Golden WU fx-rates-ensure-loaded — ensureLoaded. */
describe('FxRatesService ensureLoaded (golden WU)', () => {
  it('no-ops when loaded, loading, or in error cool-down', () => {
    const svc = Object.create(FxRatesService.prototype) as FxRatesService;
    const calls: any[] = [];
    Object.assign(svc as any, {
      loaded: true,
      loading: false,
      lastErrorAt: 0,
      api: { get: () => ({ subscribe: (h: any) => calls.push(h) }) },
    });
    svc.ensureLoaded();
    expect(calls).toEqual([]);

    Object.assign(svc as any, { loaded: false, loading: true });
    svc.ensureLoaded();
    expect(calls).toEqual([]);

    Object.assign(svc as any, {
      loading: false,
      lastErrorAt: Date.now(),
    });
    svc.ensureLoaded();
    expect(calls).toEqual([]);
  });
});
