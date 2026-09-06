import { AdminComponent } from './admin.component';

/** Golden WU — extractBlogSlug strips blog. prefix. */
describe('AdminComponent extractBlogSlug (golden WU)', () => {
  function bare(): AdminComponent {
    return Object.create(AdminComponent.prototype) as AdminComponent;
  }

  it('strips blog. prefix when present', () => {
    const cmp = bare();
    expect(cmp.extractBlogSlug('blog.hello-world')).toBe('hello-world');
    expect(cmp.extractBlogSlug('hello-world')).toBe('hello-world');
  });
});
