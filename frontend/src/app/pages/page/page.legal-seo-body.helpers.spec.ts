import { CmsPageComponent } from './page.component';

/** Golden WU — formatLegalIndexDate / hasMeaningfulBodyContent / showSeoLinkCluster. */
describe('CmsPageComponent legal/seo/body helpers (golden WU)', () => {
  function bare(overrides: Record<string, unknown> = {}): CmsPageComponent {
    const cmp = Object.create(CmsPageComponent.prototype) as CmsPageComponent;
    Object.assign(cmp as any, {
      bodyHtml: () => '',
      requiresLogin: () => false,
      legalIndexDocs: () => [] as unknown[],
      translate: { currentLang: 'en' },
      ...overrides,
    });
    return cmp;
  }

  it('formatLegalIndexDate keeps non-ISO and formats YYYY-MM-DD', () => {
    const cmp = bare();
    expect(cmp.formatLegalIndexDate('')).toBe('');
    expect(cmp.formatLegalIndexDate('  ')).toBe('');
    expect(cmp.formatLegalIndexDate('not-a-date')).toBe('not-a-date');
    const out = cmp.formatLegalIndexDate('2026-03-15');
    expect(out).not.toBe('2026-03-15');
    expect(out.length).toBeGreaterThan(0);
  });

  it('hasMeaningfulBodyContent strips HTML and requires >= 80 chars', () => {
    expect(bare({ bodyHtml: () => '<p>short</p>' }).hasMeaningfulBodyContent()).toBe(false);
    const long = '<p>' + 'word '.repeat(40) + '</p>';
    expect(bare({ bodyHtml: () => long }).hasMeaningfulBodyContent()).toBe(true);
  });

  it('showSeoLinkCluster hides when login required or legal index present', () => {
    expect(bare().showSeoLinkCluster()).toBe(true);
    expect(bare({ requiresLogin: () => true }).showSeoLinkCluster()).toBe(false);
    expect(bare({ legalIndexDocs: () => [{ slug: 'tos' }] }).showSeoLinkCluster()).toBe(false);
  });
});
