import { signal } from '@angular/core';
import { BlogPostComponent } from './blog-post.component';

/** Golden WU blog-submit-newsletter-gates — submitNewsletter early-return arms. */
describe('BlogPostComponent submitNewsletter gates (golden WU)', () => {
  function createCmp(overrides: Record<string, unknown> = {}) {
    const cmp = Object.create(BlogPostComponent.prototype) as BlogPostComponent;
    (cmp as any).newsletterEmail = 'a@b.co';
    (cmp as any).captchaEnabled = false;
    (cmp as any).newsletterCaptchaToken = null;
    (cmp as any).newsletterLoading = signal(false);
    (cmp as any).newsletterSubscribed = signal(false);
    (cmp as any).newsletterAlreadySubscribed = signal(false);
    (cmp as any).toast = { error: jasmine.createSpy('error') };
    (cmp as any).translate = { instant: (k: string) => k };
    (cmp as any).newsletter = { subscribe: jasmine.createSpy('subscribe') };
    Object.assign(cmp as any, overrides);
    return cmp;
  }

  it('submitNewsletter no-ops on empty email', () => {
    const ev = { preventDefault: jasmine.createSpy('pd') } as any;
    const cmp = createCmp({ newsletterEmail: '  ' });
    cmp.submitNewsletter(ev);
    expect(ev.preventDefault).toHaveBeenCalled();
    expect((cmp as any).newsletter.subscribe).not.toHaveBeenCalled();
  });

  it('submitNewsletter requires captcha when enabled', () => {
    const cmp = createCmp({ captchaEnabled: true, newsletterCaptchaToken: null });
    cmp.submitNewsletter();
    expect((cmp as any).toast.error).toHaveBeenCalled();
    expect((cmp as any).newsletter.subscribe).not.toHaveBeenCalled();
  });

  it('submitNewsletter kicks off subscribe when gates pass', () => {
    const cmp = createCmp({ newsletterCaptchaToken: 'tok' });
    const sub = { subscribe: jasmine.createSpy('subscribe') };
    (cmp as any).newsletter.subscribe.and.returnValue(sub);
    cmp.submitNewsletter();
    expect((cmp as any).newsletterLoading()).toBe(true);
    expect((cmp as any).newsletterSubscribed()).toBe(false);
    expect((cmp as any).newsletterAlreadySubscribed()).toBe(false);
    expect((cmp as any).newsletter.subscribe).toHaveBeenCalledWith('a@b.co', {
      source: 'blog',
      captcha_token: 'tok',
    });
    expect(sub.subscribe).toHaveBeenCalled();
  });
});
