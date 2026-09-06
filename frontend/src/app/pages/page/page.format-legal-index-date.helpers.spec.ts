import { CmsPageComponent } from './page.component';

/** Golden WU page-format-legal-index-date — formatLegalIndexDate. */
describe('CmsPageComponent formatLegalIndexDate (golden WU)', () => {
  it('formats YYYY-MM-DD and passes through other values', () => {
    const cmp = Object.create(CmsPageComponent.prototype) as CmsPageComponent;
    Object.assign(cmp as any, { translate: { currentLang: 'en' } });
    expect(cmp.formatLegalIndexDate('')).toBe('');
    expect(cmp.formatLegalIndexDate('  ')).toBe('');
    expect(cmp.formatLegalIndexDate('not-a-date')).toBe('not-a-date');
    const formatted = cmp.formatLegalIndexDate('2024-01-15');
    expect(formatted).toMatch(/2024/);
    expect(formatted).toMatch(/15|Jan/i);
  });
});
