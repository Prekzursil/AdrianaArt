import { ThemeService } from './theme.service';

/** Golden WU theme-mode — mode. */
describe('ThemeService mode (golden WU)', () => {
  it('returns the readonly mode signal', () => {
    const svc = Object.create(ThemeService.prototype) as ThemeService;
    const readonly = (() => 'dark') as any;
    Object.assign(svc as any, {
      modeSignal: { asReadonly: () => readonly },
    });
    expect(svc.mode()).toBe(readonly);
  });
});
