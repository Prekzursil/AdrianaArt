import { AdminComponent } from './admin.component';

/** Golden WU admin-blog-seo-title-full — blogSeoTitleFull. */
describe('AdminComponent blogSeoTitleFull (golden WU)', () => {
  it('returns empty or title piped with brand for edit/snapshot langs', () => {
    const cmp = Object.create(AdminComponent.prototype) as AdminComponent;
    (cmp as any).blogEditLang = 'ro';
    (cmp as any).blogForm = { title: '  ' };
    (cmp as any).blogSeoSnapshots = { en: { title: 'Hello' } };
    expect(cmp.blogSeoTitleFull('ro' as any)).toBe('');
    (cmp as any).blogForm = { title: 'Titlu' };
    expect(cmp.blogSeoTitleFull('ro' as any)).toBe('Titlu | momentstudio');
    expect(cmp.blogSeoTitleFull('en' as any)).toBe('Hello | momentstudio');
  });
});
