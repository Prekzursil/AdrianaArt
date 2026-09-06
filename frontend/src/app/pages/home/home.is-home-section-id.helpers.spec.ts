import { HomeComponent } from './home.component';

describe('HomeComponent isHomeSectionId (golden WU)', () => {
  it('accepts known section ids only', () => {
    const cmp = Object.create(HomeComponent.prototype) as any;
    expect(cmp.isHomeSectionId('featured_products')).toBe(true);
    expect(cmp.isHomeSectionId('why')).toBe(true);
    expect(cmp.isHomeSectionId('nope')).toBe(false);
    expect(cmp.isHomeSectionId(1)).toBe(false);
  });
});
