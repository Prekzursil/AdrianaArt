import { ThemeService } from './theme.service';

/** Golden WU theme-preference — preference. */
describe('ThemeService preference (golden WU)', () => {
  it('returns the readonly preference signal', () => {
    const svc = Object.create(ThemeService.prototype) as ThemeService;
    const readonly = (() => 'system') as any;
    Object.assign(svc as any, {
      preferenceSignal: { asReadonly: () => readonly },
    });
    expect(svc.preference()).toBe(readonly);
  });
});
