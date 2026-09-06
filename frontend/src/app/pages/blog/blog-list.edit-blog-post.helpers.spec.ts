import { BlogListComponent } from './blog-list.component';

/** Golden WU blog-list-edit-blog-post -- editBlogPost. */
describe('BlogListComponent editBlogPost (golden WU)', () => {
  it('navigates to admin blog edit for a non-empty slug', () => {
    const cmp = Object.create(BlogListComponent.prototype) as BlogListComponent;
    const event = {
      preventDefault: jasmine.createSpy('preventDefault'),
      stopPropagation: jasmine.createSpy('stopPropagation'),
    } as any;
    Object.assign(cmp as any, {
      router: { navigate: jasmine.createSpy('navigate').and.returnValue(Promise.resolve(true)) },
    });
    cmp.editBlogPost(event, ' post-1 ');
    expect(event.preventDefault).toHaveBeenCalled();
    expect(event.stopPropagation).toHaveBeenCalled();
    expect((cmp as any).router.navigate).toHaveBeenCalledWith(['/admin/content/blog'], {
      queryParams: { edit: 'post-1' },
    });
    cmp.editBlogPost(event, '  ');
    expect((cmp as any).router.navigate).toHaveBeenCalledTimes(1);
  });
});
