import { CarouselBlockComponent } from './carousel-block.component';

/** Golden WU carousel-block-next — next. */
describe('CarouselBlockComponent next (golden WU)', () => {
  it('wraps forward through slides', () => {
    const cmp = Object.create(CarouselBlockComponent.prototype) as CarouselBlockComponent;
    Object.assign(cmp as any, {
      slides: [{ id: 'a' }, { id: 'b' }, { id: 'c' }] as any,
      activeIndex: 2,
      settings: { autoplay: false, interval_ms: 5000, pause_on_hover: true },
      timer: undefined,
      hovered: false,
    });
    cmp.next();
    expect((cmp as any).activeIndex).toBe(0);
    cmp.next();
    expect((cmp as any).activeIndex).toBe(1);
  });
});
