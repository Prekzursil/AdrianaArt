import { signal } from '@angular/core';
import { of, throwError } from 'rxjs';
import { BlogPostComponent } from './blog-post.component';

describe('BlogPostComponent startReply / deleteComment (golden WU)', () => {
  function createCmp(overrides: Record<string, unknown> = {}) {
    const cmp = Object.create(BlogPostComponent.prototype) as BlogPostComponent;
    Object.assign(cmp as any, {
      replyTo: signal(null),
      canDelete: () => true,
      loadComments: jasmine.createSpy('loadComments'),
      blog: { deleteComment: jasmine.createSpy('deleteComment').and.returnValue(of({})) },
      translate: { instant: (k: string) => k },
      toast: { error: jasmine.createSpy('error') },
      ...overrides,
    });
    return cmp;
  }

  it('startReply sets replyTo', () => {
    const cmp = createCmp();
    const comment = { id: 'c1' } as any;
    cmp.startReply(comment);
    expect((cmp as any).replyTo()).toEqual(comment);
  });

  it('deleteComment confirms and reloads', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    const cmp = createCmp();
    cmp.deleteComment({ id: 'c1' } as any);
    expect((cmp as any).blog.deleteComment).toHaveBeenCalledWith('c1');
    expect((cmp as any).loadComments).toHaveBeenCalled();
  });

  it('deleteComment toasts on error and respects canDelete', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    const denied = createCmp({ canDelete: () => false });
    denied.deleteComment({ id: 'c1' } as any);
    expect((denied as any).blog.deleteComment).not.toHaveBeenCalled();

    const cmp = createCmp({
      blog: {
        deleteComment: jasmine
          .createSpy('deleteComment')
          .and.returnValue(throwError(() => new Error('x'))),
      },
    });
    cmp.deleteComment({ id: 'c1' } as any);
    expect((cmp as any).toast.error).toHaveBeenCalled();
  });
});
