import { signal } from '@angular/core';
import { BlogPostComponent } from './blog-post.component';

/** Golden WU blog-comment-sort-page — N=3 setCommentSort / goToCommentsPage (#767 sidecar). */
describe('BlogPostComponent comment sort/page helpers (golden WU)', () => {
  function createCmp(): BlogPostComponent {
    const cmp = Object.create(BlogPostComponent.prototype) as BlogPostComponent;
    (cmp as any).commentSort = signal<'newest' | 'oldest' | 'top'>('newest');
    (cmp as any).commentPage = signal(1);
    (cmp as any).commentsMeta = signal<{ total_pages: number } | null>(null);
    (cmp as any).loadComments = jasmine.createSpy('loadComments');
    return cmp;
  }

  it('setCommentSort ignores invalid and unchanged sorts', () => {
    const cmp = createCmp();
    cmp.setCommentSort('nope' as any);
    expect((cmp as any).loadComments).not.toHaveBeenCalled();

    cmp.setCommentSort('newest');
    expect((cmp as any).loadComments).not.toHaveBeenCalled();
  });

  it('setCommentSort resets to page 1 and reloads when sort changes', () => {
    const cmp = createCmp();
    (cmp as any).commentPage.set(3);
    cmp.setCommentSort('oldest');
    expect((cmp as any).commentPage()).toBe(1);
    expect((cmp as any).loadComments).toHaveBeenCalledWith({ page: 1, sort: 'oldest' });
  });

  it('goToCommentsPage clamps, skips same page, and loads when page changes', () => {
    const cmp = createCmp();
    (cmp as any).commentsMeta.set({ total_pages: 5 });
    (cmp as any).commentPage.set(1);

    cmp.goToCommentsPage(1);
    expect((cmp as any).loadComments).not.toHaveBeenCalled();

    cmp.goToCommentsPage(99);
    expect((cmp as any).loadComments).toHaveBeenCalledWith({ page: 5 });

    (cmp as any).loadComments.calls.reset();
    (cmp as any).commentPage.set(2);
    cmp.goToCommentsPage(3);
    expect((cmp as any).loadComments).toHaveBeenCalledWith({ page: 3 });
  });
});
