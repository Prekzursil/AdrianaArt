import { CarouselBlockComponent } from './carousel-block.component';

/** Golden WU carousel-on-hover — onHover. */
describe('CarouselBlockComponent onHover (golden WU)', () => {
  it('stops autoplay when pause_on_hover and hovered', () => {
    const cmp = Object.create(CarouselBlockComponent.prototype) as CarouselBlockComponent;
    let stopped = 0;
    let started = 0;
    Object.assign(cmp as any, {
      settings: { pause_on_hover: true },
      stopAutoplay: () => {
        stopped += 1;
      },
      startAutoplay: () => {
        started += 1;
      },
    });
    cmp.onHover(true);
    expect((cmp as any).hovered).toBe(true);
    expect(stopped).toBe(1);
    cmp.onHover(false);
    expect((cmp as any).hovered).toBe(false);
    expect(started).toBe(1);
  });
});
