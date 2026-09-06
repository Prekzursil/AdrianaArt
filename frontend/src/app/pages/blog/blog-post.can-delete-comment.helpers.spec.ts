import { BlogPostComponent } from './blog-post.component';

/** Golden WU blog-can-delete-comment — canDelete. */
describe('BlogPostComponent canDelete (golden WU)', () => {
  it('gates on auth, deleted flag, admin or author', () => {
    const cmp = Object.create(BlogPostComponent.prototype) as BlogPostComponent;
    (cmp as any).auth = {
      isAuthenticated: () => false,
      user: () => null,
      isAdmin: () => false,
    };
    const comment = { is_deleted: false, author: { id: 'u1' } } as any;
    expect(cmp.canDelete(comment)).toBe(false);
    (cmp as any).auth.isAuthenticated = () => true;
    (cmp as any).auth.user = () => ({ id: 'u2' });
    expect(cmp.canDelete(comment)).toBe(false);
    (cmp as any).auth.user = () => ({ id: 'u1' });
    expect(cmp.canDelete(comment)).toBe(true);
    (cmp as any).auth.user = () => ({ id: 'u2' });
    (cmp as any).auth.isAdmin = () => true;
    expect(cmp.canDelete(comment)).toBe(true);
    expect(cmp.canDelete({ ...comment, is_deleted: true })).toBe(false);
  });
});
