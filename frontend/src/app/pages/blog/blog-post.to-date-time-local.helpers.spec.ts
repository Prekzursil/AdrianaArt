import { BlogPostComponent } from './blog-post.component';

/** Golden WU blog-post-to-date-time-local — toDateTimeLocal. */
describe('BlogPostComponent toDateTimeLocal (golden WU)', () => {
  it('returns empty for blank/invalid; formats finite dates', () => {
    const cmp = Object.create(BlogPostComponent.prototype) as BlogPostComponent;
    expect((cmp as any).toDateTimeLocal(null)).toBe('');
    expect((cmp as any).toDateTimeLocal('not-a-date')).toBe('');
    const out = (cmp as any).toDateTimeLocal('2024-01-02T03:04:05.000Z');
    expect(out).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/);
    const d = new Date('2024-01-02T03:04:05.000Z');
    const pad = (n: number) => String(n).padStart(2, '0');
    expect(out).toBe(
      `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`,
    );
  });
});
