import { signal } from '@angular/core';
import { BlogPostComponent } from './blog-post.component';

/** Golden WU blog-share-wa-fb — shareWhatsApp / shareFacebook. */
describe('BlogPostComponent share WA/FB helpers (golden WU)', () => {
  function createCmp(opts: { url?: string; title?: string; hasWindow?: boolean } = {}) {
    const cmp = Object.create(BlogPostComponent.prototype) as BlogPostComponent;
    const open = jasmine.createSpy('open');
    (cmp as any).document = {
      defaultView: opts.hasWindow === false ? null : { open },
    };
    (cmp as any).buildShareUrl = jasmine.createSpy('buildShareUrl').and.returnValue(opts.url ?? 'https://ex.test/blog/p1?lang=en');
    (cmp as any).post = signal(opts.title !== undefined ? { title: opts.title } : { title: 'Hello' });
    return { cmp, open };
  }

  it('shareWhatsApp no-ops without window or url', () => {
    const noWin = createCmp({ hasWindow: false });
    noWin.cmp.shareWhatsApp();
    expect(noWin.open).not.toHaveBeenCalled();

    const noUrl = createCmp({ url: '' });
    noUrl.cmp.shareWhatsApp();
    expect(noUrl.open).not.toHaveBeenCalled();
  });

  it('shareWhatsApp opens wa.me with title+url', () => {
    const { cmp, open } = createCmp({ title: 'Hi', url: 'https://ex.test/x' });
    cmp.shareWhatsApp();
    expect(open).toHaveBeenCalledWith(
      `https://wa.me/?text=${encodeURIComponent('Hi https://ex.test/x')}`,
      '_blank',
      'noopener,noreferrer',
    );
  });

  it('shareFacebook opens sharer with encoded url', () => {
    const { cmp, open } = createCmp({ url: 'https://ex.test/y' });
    cmp.shareFacebook();
    expect(open).toHaveBeenCalledWith(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://ex.test/y')}`,
      '_blank',
      'noopener,noreferrer',
    );
  });
});
