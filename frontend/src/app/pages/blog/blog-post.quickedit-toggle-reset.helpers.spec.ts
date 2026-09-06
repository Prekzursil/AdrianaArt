import { signal } from '@angular/core';
import { BlogPostComponent } from './blog-post.component';

describe('BlogPostComponent toggleQuickEdit / resetQuickEdit (golden WU)', () => {
  function bare(overrides: Record<string, unknown> = {}) {
    const cmp = Object.create(BlogPostComponent.prototype) as BlogPostComponent;
    Object.assign(cmp as any, {
      quickEditOpen: signal(false),
      quickEditError: signal('err'),
      adminBlock: () => ({ id: 'b1' }),
      adminBlockLoading: () => false,
      loadAdminBlock: jasmine.createSpy('loadAdminBlock'),
      hydrateQuickEditFromState: jasmine.createSpy('hydrateQuickEditFromState'),
      ...overrides,
    });
    return cmp;
  }

  it('toggleQuickEdit opens and hydrates when block ready', () => {
    const cmp = bare();
    cmp.toggleQuickEdit();
    expect(cmp.quickEditOpen()).toBe(true);
    expect(cmp.quickEditError()).toBe('');
    expect((cmp as any).hydrateQuickEditFromState).toHaveBeenCalled();
  });

  it('toggleQuickEdit loads admin block when missing', () => {
    const cmp = bare({ adminBlock: () => null });
    cmp.toggleQuickEdit();
    expect((cmp as any).loadAdminBlock).toHaveBeenCalled();
    expect((cmp as any).hydrateQuickEditFromState).not.toHaveBeenCalled();
  });

  it('resetQuickEdit clears error and rehydrates', () => {
    const cmp = bare();
    cmp.resetQuickEdit();
    expect(cmp.quickEditError()).toBe('');
    expect((cmp as any).hydrateQuickEditFromState).toHaveBeenCalled();
  });
});
