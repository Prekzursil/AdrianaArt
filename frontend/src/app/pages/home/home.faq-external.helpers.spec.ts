import { HomeComponent } from './home.component';

/** Golden WU home-faq — N=3 isExternalHttpUrl / asFaqBlock / asTestimonialsBlock. */
describe('HomeComponent faq / external helpers (golden WU)', () => {
  function createCmp(): HomeComponent {
    return Object.create(HomeComponent.prototype) as HomeComponent;
  }

  it('isExternalHttpUrl accepts http(s) URLs and rejects others', () => {
    const cmp = createCmp();
    expect(cmp.isExternalHttpUrl('https://example.com')).toBe(true);
    expect(cmp.isExternalHttpUrl(' HTTP://Example.COM/x ')).toBe(true);
    expect(cmp.isExternalHttpUrl('/relative')).toBe(false);
    expect(cmp.isExternalHttpUrl('mailto:a@b.c')).toBe(false);
    expect(cmp.isExternalHttpUrl('')).toBe(false);
    expect(cmp.isExternalHttpUrl(null)).toBe(false);
    expect(cmp.isExternalHttpUrl(undefined)).toBe(false);
  });

  it('asFaqBlock returns the block only when type is faq', () => {
    const cmp = createCmp();
    const faq = { type: 'faq', items: [{ question: 'Q', answer: 'A' }] } as any;
    const other = { type: 'cta', label: 'Go' } as any;
    expect(cmp.asFaqBlock(faq)).toBe(faq);
    expect(cmp.asFaqBlock(other)).toBeNull();
  });

  it('asTestimonialsBlock returns the block only when type is testimonials', () => {
    const cmp = createCmp();
    const block = { type: 'testimonials', items: [{ quote: 'Nice' }] } as any;
    const other = { type: 'faq', items: [] } as any;
    expect(cmp.asTestimonialsBlock(block)).toBe(block);
    expect(cmp.asTestimonialsBlock(other)).toBeNull();
  });
});
