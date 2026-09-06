import { invalidateThemeCache } from './theme-source';

/** Golden WU invalidate-theme-cache -- invalidateThemeCache. */
describe('invalidateThemeCache (golden WU)', () => {
  it('clears the singleton cache slot without throwing', () => {
    expect(() => invalidateThemeCache()).not.toThrow();
    expect(() => invalidateThemeCache()).not.toThrow();
  });
});
