import { HomeComponent } from './home.component';

/** Golden WU home-as-carousel-block — asCarouselBlock. */
describe('HomeComponent asCarouselBlock (golden WU)', () => {
  it('returns carousel blocks only', () => {
    const cmp = Object.create(HomeComponent.prototype) as HomeComponent;
    const carousel = { type: 'carousel', slides: [] } as any;
    expect(cmp.asCarouselBlock(carousel)).toBe(carousel);
    expect(cmp.asCarouselBlock({ type: 'text' } as any)).toBeNull();
  });
});
