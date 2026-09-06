import { HomeComponent } from './home.component';

/** Golden WU home-is-section-id-helpers. */
describe('HomeComponent isHomeSectionId (golden WU)', () => {
  it('isHomeSectionId accepts known section ids only', () => {
    const fn = (HomeComponent.prototype as any).isHomeSectionId.bind(
      Object.create(HomeComponent.prototype),
    );
    expect(fn('featured_products')).toBe(true);
    expect(fn('sale_products')).toBe(true);
    expect(fn('why')).toBe(true);
    expect(fn('nope')).toBe(false);
    expect(fn(null)).toBe(false);
  });
});
