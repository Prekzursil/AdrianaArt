import { signal } from '@angular/core';
import { of } from 'rxjs';
import { BlogPostComponent } from './blog-post.component';

describe('BlogPostComponent submitNewsletter gate arms (golden WU #769 sidecar)', () => {
  function make(overrides: Record<string, unknown> = {}): any {
    const proto = Object.create(BlogPostComponent.prototype);
    Object.assign(
      proto,
      {
        newsletterEmail: '',
        captchaEnabled: false,
        newsletterCaptchaToken: null as string | null,
        newsletterLoading: signal(false),
        newsletterSubscribed: signal(false),
        newsletterAlreadySubscribed: signal(false),
        newsletterCaptcha: { reset: jasmine.createSpy('reset') },
        translate: { instant: (k: string) => k },
        toast: {
          error: jasmine.createSpy('error'),
          success: jasmine.createSpy('success'),
        },
        newsletter: {
          subscribe: jasmine.createSpy('subscribe').and.returnValue(of({ already_subscribed: false })),
        },
      },
      overrides,
    );
    return proto;
  }

  it('returns early when email is blank', () => {
    const c = make({ newsletterEmail: '   ' });
    const ev = { preventDefault: jasmine.createSpy('preventDefault') };
    c.submitNewsletter(ev);
    expect(ev.preventDefault).toHaveBeenCalled();
    expect(c.newsletter.subscribe).not.toHaveBeenCalled();
    expect(c.newsletterLoading()).toBe(false);
  });

  it('toasts and returns when captcha is required but missing', () => {
    const c = make({
      newsletterEmail: 'a@b.co',
      captchaEnabled: true,
      newsletterCaptchaToken: null,
    });
    c.submitNewsletter();
    expect(c.toast.error).toHaveBeenCalledWith(
      'blog.newsletter.errorTitle',
      'auth.captchaRequired',
    );
    expect(c.newsletter.subscribe).not.toHaveBeenCalled();
  });

  it('posts trimmed email via NewsletterService.subscribe', () => {
    const c = make({
      newsletterEmail: '  a@b.co ',
      captchaEnabled: true,
      newsletterCaptchaToken: 'tok',
    });
    c.submitNewsletter();
    expect(c.newsletter.subscribe).toHaveBeenCalledWith('a@b.co', {
      source: 'blog',
      captcha_token: 'tok',
    });
    expect(c.newsletterSubscribed()).toBe(true);
    expect(c.newsletterLoading()).toBe(false);
    expect(c.newsletterCaptchaToken).toBeNull();
    expect(c.newsletterCaptcha.reset).toHaveBeenCalled();
    expect(c.toast.success).toHaveBeenCalled();
  });
});
