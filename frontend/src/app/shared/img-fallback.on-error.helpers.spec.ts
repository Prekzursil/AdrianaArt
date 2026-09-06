import { ImgFallbackDirective } from './img-fallback.directive';

/** Golden WU img-fallback-on-error — onError. */
describe('ImgFallbackDirective onError (golden WU)', () => {
  it('applies fallback once and clears srcset', () => {
    const img = {
      dataset: {} as Record<string, string>,
      src: 'broken.jpg',
      srcset: 'a 1x',
      removeAttribute: jasmine.createSpy('removeAttribute'),
    };
    const dir = Object.create(ImgFallbackDirective.prototype) as ImgFallbackDirective;
    Object.assign(dir as any, {
      fallbackSrc: undefined,
      el: { nativeElement: img },
    });
    dir.onError();
    expect(img.src).toBe('broken.jpg');

    Object.assign(dir as any, { fallbackSrc: '/fallback.png' });
    dir.onError();
    expect(img.src).toBe('/fallback.png');
    expect(img.srcset).toBe('');
    expect(img.dataset['fallbackApplied']).toBe('true');
    expect(img.removeAttribute).toHaveBeenCalledWith('srcset');

    img.src = 'still-broken.jpg';
    dir.onError();
    expect(img.src).toBe('still-broken.jpg');
  });
});
