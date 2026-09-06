import { BlogPostComponent } from './blog-post.component';

/** Golden WU blog-post-can-delete — canDelete. */
describe('BlogPostComponent canDelete (golden WU)', () => {
  it('allows admins or authors; blocks guests/deleted', () => {
    const cmp = Object.create(BlogPostComponent.prototype) as BlogPostComponent;
    Object.assign(cmp as any, {
      auth: {
        isAuthenticated: () => false,
        user: () => null,
        isAdmin: () => false,
      },
    });
    expect(cmp.canDelete({ is_deleted: false, author: { id: 'a' } } as any)).toBe(false);
    Object.assign(cmp as any, {
      auth: {
        isAuthenticated: () => true,
        user: () => ({ id: 'a' }),
        isAdmin: () => false,
      },
    });
    expect(cmp.canDelete({ is_deleted: true, author: { id: 'a' } } as any)).toBe(false);
    expect(cmp.canDelete({ is_deleted: false, author: { id: 'a' } } as any)).toBe(true);
    expect(cmp.canDelete({ is_deleted: false, author: { id: 'b' } } as any)).toBe(false);
    Object.assign(cmp as any, {
      auth: {
        isAuthenticated: () => true,
        user: () => ({ id: 'x' }),
        isAdmin: () => true,
      },
    });
    expect(cmp.canDelete({ is_deleted: false, author: { id: 'b' } } as any)).toBe(true);
  });
});
