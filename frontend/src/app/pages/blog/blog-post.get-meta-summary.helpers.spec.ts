import { BlogPostComponent } from './blog-post.component';

describe('BlogPostComponent getMetaSummary (golden WU)', () => {
  const summary = (meta: Record<string, unknown>, lang: 'en' | 'ro') =>
    (Object.create(BlogPostComponent.prototype) as any).getMetaSummary(meta, lang);

  it('reads string or per-lang object summaries', () => {
    expect(summary({}, 'en')).toBe('');
    expect(summary({ summary: '  Hello  ' }, 'en')).toBe('Hello');
    expect(summary({ summary: { en: ' EN ', ro: ' RO ' } }, 'ro')).toBe('RO');
    expect(summary({ summary: { en: 1 } }, 'en')).toBe('');
    expect(summary({ summary: ['x'] }, 'en')).toBe('');
  });
});
