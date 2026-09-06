import { BlogPostComponent } from './blog-post.component';

/** Golden WU blog-can-flag-comment — canFlag. */
describe('BlogPostComponent canFlag (golden WU)', () => {
  it('requires auth and non-deleted/non-hidden comment by someone else', () => {
    const cmp = Object.create(BlogPostComponent.prototype) as BlogPostComponent;
    (cmp as any).auth = {
      isAuthenticated: () => true,
      user: () => ({ id: 'me' }),
    };
    expect(cmp.canFlag({ is_deleted: true, is_hidden: false, author: { id: 'other' } } as any)).toBe(
      false,
    );
    expect(cmp.canFlag({ is_deleted: false, is_hidden: true, author: { id: 'other' } } as any)).toBe(
      false,
    );
    expect(cmp.canFlag({ is_deleted: false, is_hidden: false, author: { id: 'me' } } as any)).toBe(
      false,
    );
    expect(cmp.canFlag({ is_deleted: false, is_hidden: false, author: { id: 'other' } } as any)).toBe(
      true,
    );
    (cmp as any).auth.isAuthenticated = () => false;
    expect(cmp.canFlag({ is_deleted: false, is_hidden: false, author: { id: 'other' } } as any)).toBe(
      false,
    );
  });
});
