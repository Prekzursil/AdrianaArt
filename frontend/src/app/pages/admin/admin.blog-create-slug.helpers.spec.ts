import { AdminComponent } from './admin.component';

/** Golden WU admin-blog-create-slug — blogCreateSlug. */
describe('AdminComponent blogCreateSlug (golden WU)', () => {
  it('normalizes blogCreate.title', () => {
    const cmp = Object.create(AdminComponent.prototype) as AdminComponent;
    Object.assign(cmp as any, {
      blogCreate: { title: 'Hello World!' },
      normalizeBlogSlug: (s: string) => s.toLowerCase().replace(/\s+/g, '-').replace(/!$/, ''),
    });
    expect(cmp.blogCreateSlug()).toBe('hello-world');
  });
});
