import { BlogListComponent } from './blog-list.component';

/** Golden WU blog-list-can-edit-blog -- canEditBlog. */
describe('BlogListComponent canEditBlog (golden WU)', () => {
  it('mirrors storefront admin mode enabled flag', () => {
    const cmp = Object.create(BlogListComponent.prototype) as BlogListComponent;
    (cmp as any).storefrontAdminMode = { enabled: () => true };
    expect(cmp.canEditBlog()).toBe(true);
    (cmp as any).storefrontAdminMode = { enabled: () => false };
    expect(cmp.canEditBlog()).toBe(false);
  });
});
