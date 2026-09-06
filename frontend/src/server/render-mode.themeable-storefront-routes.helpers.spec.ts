import { THEMEABLE_STOREFRONT_ROUTES } from './render-mode';

/** Golden WU themeable-storefront-routes -- THEMEABLE_STOREFRONT_ROUTES. */
describe('THEMEABLE_STOREFRONT_ROUTES (golden WU)', () => {
  it('covers home/shop/about/contact/blog', () => {
    expect(THEMEABLE_STOREFRONT_ROUTES).toEqual([
      '/',
      '/shop',
      '/about',
      '/contact',
      '/blog',
    ]);
    expect(Object.isFrozen(THEMEABLE_STOREFRONT_ROUTES)).toBe(true);
  });
});
