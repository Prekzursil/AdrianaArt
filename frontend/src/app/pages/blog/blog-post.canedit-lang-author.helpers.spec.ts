import { BlogPostComponent } from './blog-post.component';

/** Golden WU blog-canedit-lang-author — N=3 canEditBlog / activeLang / authorLabel (#757 sidecar). */
describe('BlogPostComponent canEdit/lang/author helpers (golden WU)', () => {
  function createCmp(overrides: Record<string, unknown> = {}): BlogPostComponent {
    const cmp = Object.create(BlogPostComponent.prototype) as BlogPostComponent;
    (cmp as any).storefrontAdminMode = { enabled: () => false };
    (cmp as any).translate = {
      currentLang: 'en',
      instant: (key: string) => key,
    };
    Object.assign(cmp as any, overrides);
    return cmp;
  }

  it('canEditBlog mirrors storefrontAdminMode.enabled()', () => {
    expect(createCmp({ storefrontAdminMode: { enabled: () => false } }).canEditBlog()).toBe(false);
    expect(createCmp({ storefrontAdminMode: { enabled: () => true } }).canEditBlog()).toBe(true);
  });

  it('activeLang is ro only when translate.currentLang is ro', () => {
    expect(createCmp({ translate: { currentLang: 'en', instant: (k: string) => k } }).activeLang()).toBe(
      'en',
    );
    expect(createCmp({ translate: { currentLang: 'ro', instant: (k: string) => k } }).activeLang()).toBe(
      'ro',
    );
    expect(createCmp({ translate: { currentLang: 'fr', instant: (k: string) => k } }).activeLang()).toBe(
      'en',
    );
  });

  it('authorLabel formats identity with anonymous fallback', () => {
    const cmp = createCmp({
      translate: {
        currentLang: 'en',
        instant: (key: string) => (key === 'blog.comments.anonymous' ? 'Anonymous' : key),
      },
    });
    expect(cmp.authorLabel(null)).toBe('Anonymous');
    expect(cmp.authorLabel(undefined)).toBe('Anonymous');
    expect(cmp.authorLabel({ name: 'Ada' } as any)).toBe('Ada');
  });
});
