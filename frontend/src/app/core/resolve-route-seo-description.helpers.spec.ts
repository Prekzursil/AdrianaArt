import { resolveRouteSeoDescription } from './route-seo-defaults';

describe('resolveRouteSeoDescription (golden WU)', () => {
  it('prefers normalized candidates and falls back to route/lang defaults', () => {
    expect(resolveRouteSeoDescription('shop', 'en', '  Custom shop blurb  ')).toBe(
      'Custom shop blurb',
    );
    expect(resolveRouteSeoDescription('shop', 'en', 'shop.meta.description', '')).toContain(
      'Browse handmade',
    );
    expect(resolveRouteSeoDescription('home', 'ro', null, undefined, 0)).toContain(
      'Descopera',
    );
    expect(resolveRouteSeoDescription('contact', 'en', { nope: true })).toContain('Contact');
  });
});
