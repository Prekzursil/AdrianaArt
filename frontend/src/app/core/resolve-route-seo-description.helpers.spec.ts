import { resolveRouteSeoDescription } from './route-seo-defaults';

describe('resolveRouteSeoDescription (golden WU)', () => {
  it('prefers normalized candidates and falls back to route/lang defaults', () => {
    expect(resolveRouteSeoDescription('shop', 'en', '  Custom shop blurb  ')).toBe(
      'Custom shop blurb',
    );
    // Unresolved i18n-looking keys and empty values are skipped.
    expect(resolveRouteSeoDescription('shop', 'en', 'shop.meta.description', '')).toContain(
      'Browse handmade',
    );
    expect(resolveRouteSeoDescription('home', 'ro', null, undefined, { nope: true })).toContain(
      'Descopera',
    );
    expect(resolveRouteSeoDescription('contact', 'en')).toContain('Contact');
  });
});
