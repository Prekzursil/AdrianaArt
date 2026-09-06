import { ThemeService } from './theme.service';

/** Golden WU theme-toggle — toggle. */
describe('ThemeService toggle (golden WU)', () => {
  it('advances preference system → light → dark → system', () => {
    const svc = Object.create(ThemeService.prototype) as ThemeService;
    const calls: string[] = [];
    Object.assign(svc as any, {
      preferenceSignal: () => 'system',
      setPreference: (pref: string) => calls.push(pref),
    });
    svc.toggle();
    expect(calls).toEqual(['light']);

    Object.assign(svc as any, { preferenceSignal: () => 'light' });
    svc.toggle();
    expect(calls).toEqual(['light', 'dark']);

    Object.assign(svc as any, { preferenceSignal: () => 'dark' });
    svc.toggle();
    expect(calls).toEqual(['light', 'dark', 'system']);
  });
});
