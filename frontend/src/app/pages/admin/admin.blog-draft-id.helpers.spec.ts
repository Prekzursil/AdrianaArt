import { AdminComponent } from './admin.component';

/** Golden WU admin-blog-draft-id — blogDraftId. */
describe('AdminComponent blogDraftId (golden WU)', () => {
  function bare(): any {
    return Object.create(AdminComponent.prototype);
  }

  it('joins key and lang with a dot', () => {
    const cmp = bare();
    expect(cmp.blogDraftId('post', 'en')).toBe('post.en');
    expect(cmp.blogDraftId('a.b', 'ro')).toBe('a.b.ro');
  });
});
