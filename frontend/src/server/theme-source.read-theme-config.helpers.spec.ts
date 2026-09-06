import { readThemeConfig } from './theme-source';

/** Golden WU read-theme-config -- readThemeConfig. */
describe('readThemeConfig (golden WU)', () => {
  it('strips trailing slashes and applies kill switch / numeric overrides', () => {
    const cfg = readThemeConfig({
      SSR_API_BASE_URL: 'https://api.example.com///',
      MS_THEME_TIMEOUT_MS: '1234',
      MS_THEME_CACHE_TTL_MS: '0',
      MS_THEME_KILL_SWITCH: '1',
    });
    expect(cfg.apiBaseUrl).toBe('https://api.example.com');
    expect(cfg.timeoutMs).toBe(1234);
    expect(cfg.cacheTtlMs).toBe(0);
    expect(cfg.killSwitch).toBe(true);
  });
});
