import { BlogPostComponent } from './blog-post.component';

/** Golden WU blog-post-build-share-url — buildShareUrl. */
describe('BlogPostComponent buildShareUrl (golden WU)', () => {
  it('builds origin/blog/slug?lang with hash; empty without window/slug', () => {
    const cmp = Object.create(BlogPostComponent.prototype) as BlogPostComponent;
    Object.assign(cmp as any, {
      document: null,
      slug: 'hello',
      translate: { currentLang: 'en' },
    });
    expect((cmp as any).buildShareUrl()).toBe('');
    Object.assign(cmp as any, {
      document: {
        defaultView: {
          location: { origin: 'https://ex.test', hash: '#c1' },
        },
      },
      slug: 'hello world',
      translate: { currentLang: 'ro' },
    });
    expect((cmp as any).buildShareUrl()).toBe(
      'https://ex.test/blog/hello%20world?lang=ro#c1',
    );
  });
});
