import { errorNavLinks, errorPageMessage, shouldReloadOnRetry } from './error.helpers';

/**
 * Golden WU err50 — first error page specs.
 * Covers message mapping, escape-nav paths, and retry/reload guards.
 */
describe('ErrorComponent message / nav / retry helpers', () => {
  it('errorPageMessage maps known kinds and falls back to generic', () => {
    expect(errorPageMessage('network')).toContain('network');
    expect(errorPageMessage('server')).toContain('server');
    expect(errorPageMessage('timeout')).toContain('timed out');
    expect(errorPageMessage('generic')).toContain('logged the issue');
    expect(errorPageMessage(null)).toBe(errorPageMessage('generic'));
    expect(errorPageMessage(undefined)).toBe(errorPageMessage('generic'));
    expect(errorPageMessage('unknown-code')).toBe(errorPageMessage('generic'));
  });

  it('errorNavLinks returns home, shop, and blog escape paths', () => {
    const links = errorNavLinks();
    expect(links.map((l) => l.path)).toEqual(['/', '/shop', '/blog']);
    expect(links.map((l) => l.kind)).toEqual(['home', 'shop', 'blog']);
    // Fresh call must not share mutable state with a prior snapshot.
    expect(errorNavLinks()).not.toBe(links);
    expect(errorNavLinks()).toEqual(links);
  });

  it('shouldReloadOnRetry arms only when reload is available and not already reloading', () => {
    const reload = jasmine.createSpy('reload');
    expect(shouldReloadOnRetry(reload, false)).toBeTrue();
    expect(shouldReloadOnRetry(reload, true)).toBeFalse();
    expect(shouldReloadOnRetry(null, false)).toBeFalse();
    expect(shouldReloadOnRetry(undefined, false)).toBeFalse();
  });
});
