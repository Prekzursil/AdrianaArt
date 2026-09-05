import { HomeComponent } from './home.component';

describe('HomeComponent CTA/url/columns helpers (golden WU #773 sidecar)', () => {
  function make(): any {
    return Object.create(HomeComponent.prototype);
  }

  describe('asCtaBlock', () => {
    it('returns CTA blocks and rejects other types', () => {
      const cta = {
        type: 'cta',
        key: 'a',
        enabled: true,
        title: 'T',
        body_html: '',
        cta_label: 'Go',
        cta_url: '/x',
        cta_new_tab: true,
      };
      expect(make().asCtaBlock(cta)).toBe(cta);
      expect(make().asCtaBlock({ type: 'text', key: 't', enabled: true } as any)).toBeNull();
    });
  });

  describe('isExternalHttpUrl', () => {
    it('detects http(s) URLs and rejects relative/empty', () => {
      const c = make();
      expect(c.isExternalHttpUrl('https://shop.example/a')).toBe(true);
      expect(c.isExternalHttpUrl(' HTTP://x ')).toBe(true);
      expect(c.isExternalHttpUrl('/shop')).toBe(false);
      expect(c.isExternalHttpUrl('')).toBe(false);
      expect(c.isExternalHttpUrl(null)).toBe(false);
    });
  });

  describe('columnsGridClasses', () => {
    it('maps columns_count + breakpoint into grid class tokens', () => {
      const c = make();
      expect(c.columnsGridClasses({ columns_count: 2, breakpoint: 'md' } as any)).toBe(
        'grid gap-6 grid-cols-1 md:grid-cols-2',
      );
      expect(c.columnsGridClasses({ columns_count: 3, breakpoint: 'lg' } as any)).toBe(
        'grid gap-6 grid-cols-1 lg:grid-cols-3',
      );
      expect(c.columnsGridClasses({ columns_count: 3, breakpoint: 'sm' } as any)).toBe(
        'grid gap-6 grid-cols-1 sm:grid-cols-3',
      );
    });
  });
});
