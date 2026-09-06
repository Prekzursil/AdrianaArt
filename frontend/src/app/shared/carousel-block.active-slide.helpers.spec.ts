import { CarouselBlockComponent } from './carousel-block.component';

/** Golden WU carousel-active-slide — activeSlide. */
describe('CarouselBlockComponent activeSlide (golden WU)', () => {
  it('returns null when empty and clamps index otherwise', () => {
    const cmp = Object.create(CarouselBlockComponent.prototype) as CarouselBlockComponent;
    Object.assign(cmp as any, { slides: [], activeIndex: 0 });
    expect(cmp.activeSlide()).toBeNull();
    Object.assign(cmp as any, {
      slides: [{ id: 'a' }, { id: 'b' }],
      activeIndex: 9,
    });
    expect(cmp.activeSlide()).toEqual({ id: 'b' });
  });
});
