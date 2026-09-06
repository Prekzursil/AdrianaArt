import { isThemeableRoute } from './render-mode';

/** Golden WU is-themeable-route -- isThemeableRoute. */
describe('isThemeableRoute (golden WU)', () => {
  it('marks storefront paths themeable; admin/account are not', () => {
    expect(isThemeableRoute('/')).toBe(true);
    expect(isThemeableRoute('/shop?x=1')).toBe(true);
    expect(isThemeableRoute('/admin')).toBe(false);
    expect(isThemeableRoute('/admin/theme')).toBe(false);
    expect(isThemeableRoute('/account/orders')).toBe(false);
  });
});
