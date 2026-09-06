import { CarouselBlockComponent } from './carousel-block.component';

/** Golden WU carousel-prev — prev. */
describe('CarouselBlockComponent prev (golden WU)', () => {
  it('wraps to the last slide', () => {
    const cmp = Object.create(CarouselBlockComponent.prototype) as CarouselBlockComponent;
    let restarts = 0;
    Object.assign(cmp as any, {
      slides: [{ id: 'a' }, { id: 'b' }, { id: 'c' }],
      activeIndex: 0,
      restartAutoplay: () => {
        restarts += 1;
      },
    });
    cmp.prev();
    expect((cmp as any).activeIndex).toBe(2);
    expect(restarts).toBe(1);
  });
});
