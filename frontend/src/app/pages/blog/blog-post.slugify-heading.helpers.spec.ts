import { BlogPostComponent } from './blog-post.component';

/** Golden WU blog-slugify-heading — slugifyHeading. */
describe('BlogPostComponent slugifyHeading (golden WU)', () => {
  it('slugifies headings and strips diacritics', () => {
    const cmp = Object.create(BlogPostComponent.prototype) as any;
    expect(cmp.slugifyHeading('Hello World!')).toBe('hello-world');
    expect(cmp.slugifyHeading('Café')).toBe('cafe');
    expect(cmp.slugifyHeading('')).toBe('');
  });
});
