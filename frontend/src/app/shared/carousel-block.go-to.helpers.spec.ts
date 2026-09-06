import { CarouselBlockComponent } from './carousel-block.component';

/** Golden WU carousel-block-go-to — goTo. */
describe('CarouselBlockComponent goTo (golden WU)', () => {
  it('no-ops without slides and clamps the requested index', () => {
    const cmp = Object.create(CarouselBlockComponent.prototype) as CarouselBlockComponent;
    Object.assign(cmp as any, {
      slides: [],
      activeIndex: 0,
      settings: { autoplay: false, interval_ms: 5000, pause_on_hover: true },
      timer: undefined,
      hovered: false,
    });
    cmp.goTo(2);
    expect((cmp as any).activeIndex).toBe(0);
    Object.assign(cmp as any, { slides: [{ id: 'a' }, { id: 'b' }, { id: 'c' }] as any });
    cmp.goTo(1);
    expect((cmp as any).activeIndex).toBe(1);
    cmp.goTo(40);
    expect((cmp as any).activeIndex).toBe(2);
    cmp.goTo(-1);
    expect((cmp as any).activeIndex).toBe(0);
  });
});
