import { signal } from '@angular/core';
import { BlogPostComponent } from './blog-post.component';

/** Golden WU blog-lightbox-nav — open/close/next/prev lightbox (#gallery). */
describe('BlogPostComponent lightbox nav helpers (golden WU)', () => {
  function createCmp(images: Array<{ src: string; alt: string }> = []) {
    const cmp = Object.create(BlogPostComponent.prototype) as BlogPostComponent;
    (cmp as any).galleryImages = signal(images);
    (cmp as any).lightboxIndex = signal<number | null>(null);
    (cmp as any).previousBodyOverflow = null;
    (cmp as any).lightboxKeyListener = jasmine.createSpy('lightboxKeyListener');
    const addEventListener = jasmine.createSpy('addEventListener');
    const removeEventListener = jasmine.createSpy('removeEventListener');
    (cmp as any).document = {
      defaultView: { addEventListener, removeEventListener },
      body: { style: { overflow: '' } },
    };
    return { cmp, addEventListener, removeEventListener };
  }

  it('openLightbox no-ops on empty gallery and clamps index', () => {
    const empty = createCmp([]);
    empty.cmp.openLightbox(2);
    expect(empty.cmp.lightboxIndex()).toBeNull();

    const { cmp, addEventListener } = createCmp([
      { src: 'a', alt: 'a' },
      { src: 'b', alt: 'b' },
      { src: 'c', alt: 'c' },
    ]);
    cmp.openLightbox(99);
    expect(cmp.lightboxIndex()).toBe(2);
    expect(addEventListener).toHaveBeenCalled();
    expect((cmp as any).document.body.style.overflow).toBe('hidden');
    expect((cmp as any).previousBodyOverflow).toBe('');
  });

  it('closeLightbox removes listener and restores overflow', () => {
    const { cmp, removeEventListener } = createCmp([{ src: 'a', alt: 'a' }]);
    cmp.openLightbox(0);
    cmp.closeLightbox();
    expect(cmp.lightboxIndex()).toBeNull();
    expect(removeEventListener).toHaveBeenCalled();
    expect((cmp as any).previousBodyOverflow).toBeNull();
    expect((cmp as any).document.body.style.overflow).toBe('');
  });

  it('nextLightbox / prevLightbox wrap when 2+ images and ignore single/closed', () => {
    const { cmp } = createCmp([
      { src: 'a', alt: 'a' },
      { src: 'b', alt: 'b' },
    ]);
    const stop = jasmine.createSpy('stop');
    cmp.nextLightbox({ stopPropagation: stop } as any);
    expect(cmp.lightboxIndex()).toBeNull();

    cmp.openLightbox(0);
    cmp.nextLightbox({ stopPropagation: stop } as any);
    expect(stop).toHaveBeenCalled();
    expect(cmp.lightboxIndex()).toBe(1);
    cmp.nextLightbox();
    expect(cmp.lightboxIndex()).toBe(0);
    cmp.prevLightbox();
    expect(cmp.lightboxIndex()).toBe(1);
  });
});
