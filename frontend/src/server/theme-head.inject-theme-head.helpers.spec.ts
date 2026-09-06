import { injectThemeHead } from './theme-head';

/** Golden WU inject-theme-head -- injectThemeHead. */
describe('injectThemeHead (golden WU)', () => {
  it('injects style as first child of head when present', () => {
    const html = '<html><head><base href="/"></head><body></body></html>';
    const out = injectThemeHead(html, '<style id="ms-theme">:root{}</style>');
    expect(out.indexOf('<style id="ms-theme">')).toBeGreaterThan(-1);
    expect(out.indexOf('<style id="ms-theme">')).toBeLessThan(out.indexOf('<base'));
  });
});
