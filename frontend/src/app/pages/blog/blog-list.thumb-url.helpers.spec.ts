import { BlogListComponent } from './blog-list.component';

describe('BlogListComponent thumbUrl / markThumbFailed (golden WU)', () => {
  function make() {
    const cmp = Object.create(BlogListComponent.prototype) as BlogListComponent;
    (cmp as any).failedThumbs = new Set<string>();
    return cmp;
  }

  it('builds -sm thumb under /media; null otherwise or when failed', () => {
    const cmp = make();
    expect(cmp.thumbUrl('/media/posts/a.jpg')).toBe('/media/posts/a-sm.jpg');
    expect(cmp.thumbUrl('/media/posts/a.jpg?x=1#y')).toBe('/media/posts/a-sm.jpg');
    expect(cmp.thumbUrl('https://cdn/x.jpg')).toBeNull();
    expect(cmp.thumbUrl('/media/noext')).toBeNull();
    expect(cmp.thumbUrl('')).toBeNull();
    expect(cmp.thumbUrl(null)).toBeNull();
    cmp.markThumbFailed('/media/posts/a-sm.jpg');
    expect(cmp.thumbUrl('/media/posts/a.jpg')).toBeNull();
    cmp.markThumbFailed('');
    cmp.markThumbFailed(null);
  });
});
