import { ThemeService } from './theme.service';

/** Golden WU theme-resolve-mode — resolveMode. */
describe('ThemeService resolveMode (golden WU)', () => {
  it('passes through light/dark and resolves system via mediaQuery', () => {
    const svc = Object.create(ThemeService.prototype) as ThemeService;
    Object.assign(svc as any, { mediaQuery: { matches: true } });
    expect((svc as any).resolveMode('light')).toBe('light');
    expect((svc as any).resolveMode('dark')).toBe('dark');
    expect((svc as any).resolveMode('system')).toBe('dark');
    Object.assign(svc as any, { mediaQuery: { matches: false } });
    expect((svc as any).resolveMode('system')).toBe('light');
    Object.assign(svc as any, { mediaQuery: null });
    expect((svc as any).resolveMode('system')).toBe('light');
  });
});
