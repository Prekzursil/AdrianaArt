import { BlogPostComponent } from './blog-post.component';

/** Golden WU blog-active-lang — activeLang. */
describe('BlogPostComponent activeLang (golden WU)', () => {
  it('maps translate.currentLang to en|ro', () => {
    const cmp = Object.create(BlogPostComponent.prototype) as BlogPostComponent;
    (cmp as any).translate = { currentLang: 'ro' };
    expect(cmp.activeLang()).toBe('ro');
    (cmp as any).translate = { currentLang: 'en' };
    expect(cmp.activeLang()).toBe('en');
    (cmp as any).translate = { currentLang: 'de' };
    expect(cmp.activeLang()).toBe('en');
  });
});
