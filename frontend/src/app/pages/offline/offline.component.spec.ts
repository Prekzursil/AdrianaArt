import {
  detectBrowserOnline,
  offlineNavLinks,
  shouldReloadOnRetry,
} from './offline.helpers';

/**
 * Golden WU offline48 — first offline page specs.
 * Covers retry gate, escape-nav paths, and navigator.onLine detection helpers.
 */
describe('OfflineComponent retry / nav / online helpers', () => {
  it('offlineNavLinks returns home, shop, and blog escape paths', () => {
    const links = offlineNavLinks();
    expect(links.map((l) => l.path)).toEqual(['/', '/shop', '/blog']);
    expect(links.map((l) => l.kind)).toEqual(['home', 'shop', 'blog']);
    // Fresh call must not share mutable state with a prior snapshot.
    expect(offlineNavLinks()).not.toBe(links);
    expect(offlineNavLinks()).toEqual(links);
  });

  it('detectBrowserOnline mirrors navigator.onLine and defaults optimistic', () => {
    expect(detectBrowserOnline({ onLine: true })).toBeTrue();
    expect(detectBrowserOnline({ onLine: false })).toBeFalse();
    expect(detectBrowserOnline(null)).toBeTrue();
    expect(detectBrowserOnline(undefined)).toBeTrue();
    expect(detectBrowserOnline({} as { onLine?: boolean })).toBeTrue();
  });

  it('shouldReloadOnRetry only arms when the browser reports online', () => {
    expect(shouldReloadOnRetry(true)).toBeTrue();
    expect(shouldReloadOnRetry(false)).toBeFalse();
  });
});
