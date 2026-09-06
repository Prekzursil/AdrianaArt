import { BlogListComponent } from './blog-list.component';

describe('BlogListComponent markThumbFailed (golden WU)', () => {
  function make() {
    const cmp = Object.create(BlogListComponent.prototype) as BlogListComponent;
    (cmp as any).failedThumbs = new Set<string>();
    return cmp;
  }

  it('records stripped base urls and ignores blank input', () => {
    const cmp = make();
    cmp.markThumbFailed(null);
    cmp.markThumbFailed('  ');
    expect((cmp as any).failedThumbs.size).toBe(0);
    cmp.markThumbFailed(' https://cdn.example/a.jpg?x=1#hash ');
    expect((cmp as any).failedThumbs.has('https://cdn.example/a.jpg')).toBe(true);
  });
});
