import { ContactComponent } from './contact.component';

/** Golden WU contact-set-meta-tags -- setMetaTags. */
describe('ContactComponent setMetaTags (golden WU)', () => {
  it('sets title and meta tags with localized canonical', () => {
    const cmp = Object.create(ContactComponent.prototype) as ContactComponent;
    Object.assign(cmp as any, {
      translate: {
        currentLang: 'en',
        instant: jasmine.createSpy('instant').and.callFake((k: string) => k),
      },
      seoHeadLinks: {
        setLocalizedCanonical: jasmine
          .createSpy('setLocalizedCanonical')
          .and.returnValue('https://example.com/contact'),
      },
      title: { setTitle: jasmine.createSpy('setTitle') },
      meta: { updateTag: jasmine.createSpy('updateTag') },
    });
    (cmp as any).setMetaTags('Hello', 'body text');
    expect((cmp as any).title.setTitle).toHaveBeenCalled();
    expect((cmp as any).seoHeadLinks.setLocalizedCanonical).toHaveBeenCalledWith(
      '/contact',
      'en',
      {},
    );
    expect((cmp as any).meta.updateTag).toHaveBeenCalled();
  });
});
