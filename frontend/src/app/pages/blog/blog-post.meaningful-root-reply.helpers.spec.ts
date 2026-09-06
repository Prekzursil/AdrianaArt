import { BlogPostComponent } from './blog-post.component';

describe('BlogPostComponent rootComments / canReply / hasMeaningfulArticleText (golden WU)', () => {
  function bare(overrides: Record<string, unknown> = {}) {
    const cmp = Object.create(BlogPostComponent.prototype) as BlogPostComponent;
    Object.assign(cmp as any, {
      comments: () => [],
      bodyHtml: () => '',
      auth: { isAuthenticated: () => false },
      ...overrides,
    });
    return cmp;
  }

  it('rootComments keeps only parent-less comments', () => {
    const cmp = bare({
      comments: () => [
        { id: '1', parent_id: null },
        { id: '2', parent_id: '1' },
        { id: '3', parent_id: undefined },
      ],
    });
    expect(cmp.rootComments().map((c: any) => c.id)).toEqual(['1', '3']);
  });

  it('canReply requires auth and non-deleted comment', () => {
    const cmp = bare({ auth: { isAuthenticated: () => true } });
    expect(cmp.canReply({ is_deleted: false } as any)).toBe(true);
    expect(cmp.canReply({ is_deleted: true } as any)).toBe(false);
    expect(bare().canReply({ is_deleted: false } as any)).toBe(false);
  });

  it('hasMeaningfulArticleText strips tags and requires length >= 100', () => {
    const short = bare({ bodyHtml: () => '<p>' + 'x'.repeat(50) + '</p>' });
    expect(short.hasMeaningfulArticleText()).toBe(false);
    const long = bare({ bodyHtml: () => '<p>' + 'y'.repeat(100) + '</p>' });
    expect(long.hasMeaningfulArticleText()).toBe(true);
  });
});
