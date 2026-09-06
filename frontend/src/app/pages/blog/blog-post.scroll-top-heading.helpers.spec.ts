import { BlogPostComponent } from './blog-post.component';

/** Golden WU — scrollToTop / scrollToHeading. */
describe('BlogPostComponent scroll helpers (golden WU)', () => {
  function bare(doc: any): BlogPostComponent {
    const cmp = Object.create(BlogPostComponent.prototype) as BlogPostComponent;
    (cmp as any).document = doc;
    (cmp as any).activeHeadingId = { set: jasmine.createSpy('set') };
    return cmp;
  }

  it('scrollToTop no-ops without defaultView, else smooth scrolls', () => {
    expect(() => bare(null).scrollToTop()).not.toThrow();
    const scrollTo = jasmine.createSpy('scrollTo');
    bare({ defaultView: { scrollTo } }).scrollToTop();
    expect(scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
  });

  it('scrollToHeading prevents default, scrolls with offset, updates hash/active', () => {
    const event = { preventDefault: jasmine.createSpy('preventDefault') } as any;
    const scrollTo = jasmine.createSpy('scrollTo');
    const replaceState = jasmine.createSpy('replaceState');
    const target = { getBoundingClientRect: () => ({ top: 200 }) };
    const doc = {
      defaultView: {
        scrollTo,
        scrollY: 100,
        history: { replaceState },
        location: { pathname: '/blog/x', search: '?a=1' },
      },
      getElementById: jasmine.createSpy('getElementById').and.returnValue(target),
    };
    const cmp = bare(doc);
    cmp.scrollToHeading(event, 'h1');
    expect(event.preventDefault).toHaveBeenCalled();
    expect(doc.getElementById).toHaveBeenCalledWith('h1');
    expect(scrollTo).toHaveBeenCalledWith({ top: 200 + 100 - 112, behavior: 'smooth' });
    expect(replaceState).toHaveBeenCalledWith(null, '', '/blog/x?a=1#h1');
    expect((cmp as any).activeHeadingId.set).toHaveBeenCalledWith('h1');
  });

  it('scrollToHeading no-ops when target missing', () => {
    const event = { preventDefault: jasmine.createSpy('preventDefault') } as any;
    const scrollTo = jasmine.createSpy('scrollTo');
    const doc = {
      defaultView: {
        scrollTo,
        scrollY: 0,
        history: { replaceState: () => {} },
        location: { pathname: '/', search: '' },
      },
      getElementById: () => null,
    };
    bare(doc).scrollToHeading(event, 'missing');
    expect(scrollTo).not.toHaveBeenCalled();
  });
});
