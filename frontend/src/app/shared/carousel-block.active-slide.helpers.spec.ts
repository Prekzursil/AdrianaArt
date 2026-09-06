import { CarouselBlockComponent } from './carousel-block.component';

/** Golden WU carousel-block-active-slide — activeSlide. */
describe('CarouselBlockComponent activeSlide (golden WU)', () => {
  it('returns null for empty slides and clamps the active index', () => {
    const cmp = Object.create(CarouselBlockComponent.prototype) as CarouselBlockComponent;
    Object.assign(cmp as any, { slides: [], activeIndex: 0 });
    expect(cmp.activeSlide()).toBeNull();
    const slides = [{ id: 'a' }, { id: 'b' }, { id: 'c' }] as any;
    Object.assign(cmp as any, { slides, activeIndex: 1 });
    expect(cmp.activeSlide()).toEqual(slides[1]);
    Object.assign(cmp as any, { activeIndex: 99 });
    expect(cmp.activeSlide()).toEqual(slides[2]);
    Object.assign(cmp as any, { activeIndex: -3 });
    expect(cmp.activeSlide()).toEqual(slides[0]);
  });
});
