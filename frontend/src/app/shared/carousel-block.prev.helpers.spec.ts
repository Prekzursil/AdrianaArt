import { CarouselBlockComponent } from './carousel-block.component';

/** Golden WU carousel-block-prev — prev. */
describe('CarouselBlockComponent prev (golden WU)', () => {
  it('wraps backward through slides', () => {
    const cmp = Object.create(CarouselBlockComponent.prototype) as CarouselBlockComponent;
    Object.assign(cmp as any, {
      slides: [{ id: 'a' }, { id: 'b' }, { id: 'c' }] as any,
      activeIndex: 0,
      settings: { autoplay: false, interval_ms: 5000, pause_on_hover: true },
      timer: undefined,
      hovered: false,
    });
    cmp.prev();
    expect((cmp as any).activeIndex).toBe(2);
    cmp.prev();
    expect((cmp as any).activeIndex).toBe(1);
  });
});
