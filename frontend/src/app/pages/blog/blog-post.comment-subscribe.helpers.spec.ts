import { signal } from '@angular/core';
import { of, throwError } from 'rxjs';
import { BlogPostComponent } from './blog-post.component';

describe('BlogPostComponent toggleCommentSubscription (golden WU)', () => {
  function createCmp(overrides: Record<string, unknown> = {}) {
    const cmp = Object.create(BlogPostComponent.prototype) as BlogPostComponent;
    Object.assign(cmp as any, {
      slug: 'post-1',
      auth: { isAuthenticated: () => true },
      canSubscribeToComments: () => true,
      commentSubscribed: signal(false),
      commentSubscriptionLoading: signal(false),
      blog: {
        setCommentSubscription: jasmine
          .createSpy('setCommentSubscription')
          .and.returnValue(of({ enabled: true })),
      },
      toast: { success: jasmine.createSpy('success'), error: jasmine.createSpy('error') },
      translate: { instant: (k: string) => k },
      ...overrides,
    });
    return cmp;
  }

  function checkbox(checked: boolean) {
    return { target: { checked, checkedWrite: checked } } as any;
  }

  it('no-ops without slug or auth; reverts when cannot subscribe', () => {
    const noSlug = createCmp({ slug: '' });
    noSlug.toggleCommentSubscription({ target: { checked: true } } as any);
    expect((noSlug as any).blog.setCommentSubscription).not.toHaveBeenCalled();

    const guest = createCmp({ auth: { isAuthenticated: () => false } });
    guest.toggleCommentSubscription({ target: { checked: true } } as any);
    expect((guest as any).blog.setCommentSubscription).not.toHaveBeenCalled();

    const target = { checked: true };
    const denied = createCmp({ canSubscribeToComments: () => false });
    denied.toggleCommentSubscription({ target } as any);
    expect(target.checked).toBe(false);
    expect((denied as any).toast.error).toHaveBeenCalled();
  });

  it('optimistic update then success toast', () => {
    const cmp = createCmp();
    cmp.toggleCommentSubscription({ target: { checked: true } } as any);
    expect((cmp as any).blog.setCommentSubscription).toHaveBeenCalledWith('post-1', true);
    expect((cmp as any).commentSubscribed()).toBe(true);
    expect((cmp as any).commentSubscriptionLoading()).toBe(false);
    expect((cmp as any).toast.success).toHaveBeenCalled();
  });

  it('rolls back on error', () => {
    const target = { checked: true };
    const cmp = createCmp({
      blog: {
        setCommentSubscription: jasmine
          .createSpy('setCommentSubscription')
          .and.returnValue(throwError(() => new Error('x'))),
      },
    });
    cmp.toggleCommentSubscription({ target } as any);
    expect((cmp as any).commentSubscribed()).toBe(false);
    expect(target.checked).toBe(false);
    expect((cmp as any).toast.error).toHaveBeenCalled();
  });
});
