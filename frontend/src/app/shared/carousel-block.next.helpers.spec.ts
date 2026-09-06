import { CarouselBlockComponent } from './carousel-block.component';

/** Golden WU carousel-next — next. */
describe('CarouselBlockComponent next (golden WU)', () => {
  it('wraps to the first slide', () => {
    const cmp = Object.create(CarouselBlockComponent.prototype) as CarouselBlockComponent;
    let restarts = 0;
    Object.assign(cmp as any, {
      slides: [{ id: 'a' }, { id: 'b' }],
      activeIndex: 1,
      restartAutoplay: () => {
        restarts += 1;
      },
    });
    cmp.next();
    expect((cmp as any).activeIndex).toBe(0);
    expect(restarts).toBe(1);
  });
});
