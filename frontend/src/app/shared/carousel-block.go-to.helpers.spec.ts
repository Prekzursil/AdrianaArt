import { CarouselBlockComponent } from './carousel-block.component';

/** Golden WU carousel-go-to — goTo. */
describe('CarouselBlockComponent goTo (golden WU)', () => {
  it('clamps index and restarts autoplay', () => {
    const cmp = Object.create(CarouselBlockComponent.prototype) as CarouselBlockComponent;
    let restarts = 0;
    Object.assign(cmp as any, {
      slides: [{ id: 'a' }, { id: 'b' }, { id: 'c' }],
      activeIndex: 0,
      restartAutoplay: () => {
        restarts += 1;
      },
    });
    cmp.goTo(99);
    expect((cmp as any).activeIndex).toBe(2);
    expect(restarts).toBe(1);
    Object.assign(cmp as any, { slides: [] });
    cmp.goTo(1);
    expect((cmp as any).activeIndex).toBe(2);
    expect(restarts).toBe(1);
  });
});
