import { BlogPostComponent } from './blog-post.component';

/** Golden WU blog-has-meaningful-article-text — hasMeaningfulArticleText. */
describe('BlogPostComponent hasMeaningfulArticleText (golden WU)', () => {
  it('strips HTML and requires >= 100 chars of text', () => {
    const cmp = Object.create(BlogPostComponent.prototype) as BlogPostComponent;
    (cmp as any).bodyHtml = () => '<p>short</p>';
    expect(cmp.hasMeaningfulArticleText()).toBe(false);
    (cmp as any).bodyHtml = () => '<p>' + ('word ' * 30) + '</p>';
    expect(cmp.hasMeaningfulArticleText()).toBe(true);
    (cmp as any).bodyHtml = () => null;
    expect(cmp.hasMeaningfulArticleText()).toBe(false);
  });
});
