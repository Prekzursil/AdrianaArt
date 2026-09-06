import { CarouselBlockComponent } from './carousel-block.component';

/** Golden WU carousel-stop-autoplay — stopAutoplay. */
describe('CarouselBlockComponent stopAutoplay (golden WU)', () => {
  it('clears an existing timer', () => {
    const cmp = Object.create(CarouselBlockComponent.prototype) as CarouselBlockComponent;
    const timer = setInterval(() => undefined, 99999);
    Object.assign(cmp as any, { timer });
    (cmp as any).stopAutoplay();
    expect((cmp as any).timer).toBeUndefined();
  });
});
