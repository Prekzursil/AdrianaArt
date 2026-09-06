import { BlogListComponent } from './blog-list.component';

describe('BlogListComponent coverImageClass (golden WU)', () => {
  const cmp = Object.create(BlogListComponent.prototype) as BlogListComponent;

  it('contain vs default cover', () => {
    expect(cmp.coverImageClass('contain')).toBe('object-contain bg-slate-50 dark:bg-slate-900');
    expect(cmp.coverImageClass('cover')).toBe('object-cover');
    expect(cmp.coverImageClass(null)).toBe('object-cover');
    expect(cmp.coverImageClass(undefined)).toBe('object-cover');
  });
});
