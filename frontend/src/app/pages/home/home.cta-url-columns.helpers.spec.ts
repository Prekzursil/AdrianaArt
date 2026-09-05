import { HomeComponent } from './home.component';

describe('HomeComponent cta/url/columns helpers (golden WU)', () => {
  function createCmp() {
    return Object.create(HomeComponent.prototype) as HomeComponent;
  }

  it('asCtaBlock / asFaqBlock / asTestimonialsBlock gate on type', () => {
    const cmp = createCmp();
    expect(cmp.asCtaBlock({ type: 'cta' } as any)).toEqual(
      jasmine.objectContaining({ type: 'cta' }),
    );
    expect(cmp.asCtaBlock({ type: 'text' } as any)).toBeNull();
    expect(cmp.asFaqBlock({ type: 'faq' } as any)).toEqual(
      jasmine.objectContaining({ type: 'faq' }),
    );
    expect(cmp.asFaqBlock({ type: 'cta' } as any)).toBeNull();
    expect(cmp.asTestimonialsBlock({ type: 'testimonials' } as any)).toEqual(
      jasmine.objectContaining({ type: 'testimonials' }),
    );
    expect(cmp.asTestimonialsBlock({ type: 'faq' } as any)).toBeNull();
  });

  it('isExternalHttpUrl accepts http(s) only', () => {
    const cmp = createCmp();
    expect(cmp.isExternalHttpUrl('https://example.com')).toBe(true);
    expect(cmp.isExternalHttpUrl(' HTTP://x ')).toBe(true);
    expect(cmp.isExternalHttpUrl('/relative')).toBe(false);
    expect(cmp.isExternalHttpUrl(null)).toBe(false);
    expect(cmp.isExternalHttpUrl('')).toBe(false);
  });

  it('columnsGridClasses maps count/breakpoint', () => {
    const cmp = createCmp();
    expect(cmp.columnsGridClasses({ columns_count: 2, breakpoint: 'md' } as any)).toContain(
      'md:grid-cols-2',
    );
    expect(cmp.columnsGridClasses({ columns_count: 3, breakpoint: 'lg' } as any)).toContain(
      'lg:grid-cols-3',
    );
    expect(cmp.columnsGridClasses({ columns_count: 2, breakpoint: 'sm' } as any)).toContain('grid');
  });
});
