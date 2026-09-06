import { NewsletterUnsubscribeComponent } from './newsletter-unsubscribe.component';

/** Golden WU newsletter-unsub-unsubscribe -- unsubscribe. */
describe('NewsletterUnsubscribeComponent unsubscribe (golden WU)', () => {
  it('no-ops without token', () => {
    const cmp = Object.create(
      NewsletterUnsubscribeComponent.prototype,
    ) as NewsletterUnsubscribeComponent;
    Object.assign(cmp as any, {
      loading: false,
      success: false,
      token: '',
      newsletter: { unsubscribe: jasmine.createSpy('unsubscribe') },
    });
    cmp.unsubscribe();
    expect((cmp as any).newsletter.unsubscribe).not.toHaveBeenCalled();
  });

  it('marks success on unsubscribe', () => {
    const cmp = Object.create(
      NewsletterUnsubscribeComponent.prototype,
    ) as NewsletterUnsubscribeComponent;
    Object.assign(cmp as any, {
      loading: false,
      success: false,
      token: 'tok',
      errorMessage: 'x',
      newsletter: {
        unsubscribe: jasmine.createSpy('unsubscribe').and.returnValue({
          subscribe: (h: any) => h.next({}),
        }),
      },
    });
    cmp.unsubscribe();
    expect((cmp as any).newsletter.unsubscribe).toHaveBeenCalledWith('tok');
    expect((cmp as any).loading).toBe(false);
    expect((cmp as any).success).toBe(true);
  });
});
