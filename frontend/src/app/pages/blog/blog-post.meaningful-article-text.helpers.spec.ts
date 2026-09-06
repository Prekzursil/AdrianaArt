import { BlogPostComponent } from './blog-post.component';

/** Golden WU blog-meaningful-article-text — hasMeaningfulArticleText. */
describe('BlogPostComponent hasMeaningfulArticleText (golden WU)', () => {
  function createCmp(html: string) {
    const cmp = Object.create(BlogPostComponent.prototype) as BlogPostComponent;
    (cmp as any).bodyHtml = () => html;
    return cmp;
  }

  it('strips tags/whitespace and requires >= 100 chars', () => {
    expect(createCmp('').hasMeaningfulArticleText()).toBe(false);
    expect(createCmp('<p>short</p>').hasMeaningfulArticleText()).toBe(false);
    const long = '<p>' + 'word '.repeat(30) + '</p>';
    expect(createCmp(long).hasMeaningfulArticleText()).toBe(true);
    const padded = '<div>   ' + 'a'.repeat(99) + '   </div>';
    expect(createCmp(padded).hasMeaningfulArticleText()).toBe(false);
    expect(createCmp('<div>' + 'a'.repeat(100) + '</div>').hasMeaningfulArticleText()).toBe(true);
  });
});
