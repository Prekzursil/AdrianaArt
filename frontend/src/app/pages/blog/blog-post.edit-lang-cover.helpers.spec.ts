import { signal } from '@angular/core';
import { BlogPostComponent } from './blog-post.component';

describe('BlogPostComponent canEditBlog / activeLang / coverImageClass (golden WU)', () => {
  function createCmp(overrides: Record<string, unknown> = {}) {
    const cmp = Object.create(BlogPostComponent.prototype) as BlogPostComponent;
    Object.assign(cmp as any, {
      storefrontAdminMode: { enabled: () => false },
      translate: { currentLang: 'en' },
      quickEditOpen: signal(false),
      quickEditError: signal('err'),
      adminBlock: signal(null),
      adminBlockLoading: signal(false),
      loadAdminBlock: jasmine.createSpy('loadAdminBlock'),
      hydrateQuickEditFromState: jasmine.createSpy('hydrateQuickEditFromState'),
      ...overrides,
    });
    return cmp;
  }

  it('canEditBlog mirrors storefrontAdminMode.enabled', () => {
    expect(createCmp().canEditBlog()).toBe(false);
    expect(createCmp({ storefrontAdminMode: { enabled: () => true } }).canEditBlog()).toBe(true);
  });

  it('activeLang maps translate.currentLang to en|ro', () => {
    expect(createCmp({ translate: { currentLang: 'ro' } }).activeLang()).toBe('ro');
    expect(createCmp({ translate: { currentLang: 'en' } }).activeLang()).toBe('en');
    expect(createCmp({ translate: { currentLang: 'de' } }).activeLang()).toBe('en');
  });

  it('coverImageClass switches contain vs cover', () => {
    const cmp = createCmp();
    expect(cmp.coverImageClass('contain')).toContain('object-contain');
    expect(cmp.coverImageClass('cover')).toContain('object-cover');
    expect(cmp.coverImageClass(null)).toContain('object-cover');
  });

  it('toggleQuickEdit opens and loads admin block when missing', () => {
    const cmp = createCmp();
    cmp.toggleQuickEdit();
    expect((cmp as any).quickEditOpen()).toBe(true);
    expect((cmp as any).quickEditError()).toBe('');
    expect((cmp as any).loadAdminBlock).toHaveBeenCalled();
  });
});
