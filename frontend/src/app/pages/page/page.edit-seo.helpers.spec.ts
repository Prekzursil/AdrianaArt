import { CmsPageComponent } from './page.component';

/** Golden WU page-edit-seo-helpers. */
describe('CmsPageComponent edit/SEO helpers (golden WU)', () => {
  function bare(overrides: Record<string, unknown> = {}): CmsPageComponent {
    const cmp = Object.create(CmsPageComponent.prototype) as CmsPageComponent;
    Object.assign(cmp as any, {
      storefrontAdminMode: { enabled: () => false },
      bodyHtml: () => '',
      requiresLogin: () => false,
      legalIndexDocs: () => [],
      ...overrides,
    });
    return cmp;
  }

  it('canEditPage mirrors storefrontAdminMode.enabled', () => {
    expect(bare().canEditPage()).toBe(false);
    expect(
      bare({ storefrontAdminMode: { enabled: () => true } }).canEditPage(),
    ).toBe(true);
  });

  it('focalPosition clamps percent pair', () => {
    expect(bare().focalPosition()).toBe('50% 50%');
    expect(bare().focalPosition(120, -10)).toBe('100% 0%');
    expect(bare().focalPosition(25.4, 74.6)).toBe('25% 75%');
  });

  it('hasMeaningfulBodyContent strips HTML and requires length>=80', () => {
    expect(bare({ bodyHtml: () => '<p>short</p>' }).hasMeaningfulBodyContent()).toBe(false);
    const long = '<p>' + 'x'.repeat(80) + '</p>';
    expect(bare({ bodyHtml: () => long }).hasMeaningfulBodyContent()).toBe(true);
  });

  it('showSeoLinkCluster false when login required or legal index present', () => {
    expect(bare().showSeoLinkCluster()).toBe(true);
    expect(bare({ requiresLogin: () => true }).showSeoLinkCluster()).toBe(false);
    expect(bare({ legalIndexDocs: () => [{ id: 1 }] }).showSeoLinkCluster()).toBe(false);
  });
});
