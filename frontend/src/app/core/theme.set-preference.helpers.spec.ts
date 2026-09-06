import { ThemeService } from './theme.service';

/** Golden WU theme-set-preference — setPreference. */
describe('ThemeService setPreference (golden WU)', () => {
  it('sets preference, applies resolved mode, and persists when asked', () => {
    const svc = Object.create(ThemeService.prototype) as ThemeService;
    const calls: any = { pref: null, mode: null, stored: null };
    Object.assign(svc as any, {
      preferenceSignal: { set: (v: any) => (calls.pref = v) },
      resolveMode: (pref: string) => `resolved:${pref}`,
      applyMode: (mode: string) => (calls.mode = mode),
    });
    const store: Record<string, string> = {};
    (globalThis as any).localStorage = {
      setItem: (k: string, v: string) => {
        store[k] = v;
        calls.stored = v;
      },
    };
    svc.setPreference('dark' as any, true);
    expect(calls.pref).toBe('dark');
    expect(calls.mode).toBe('resolved:dark');
    expect(calls.stored).toBe('dark');
  });
});
