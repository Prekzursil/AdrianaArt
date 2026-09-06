import { AdminProductsComponent } from './admin-products.component';

/** Golden WU — formatTimestamp localizes valid dates. */
describe('AdminProductsComponent formatTimestamp (golden WU)', () => {
  function bare(): AdminProductsComponent {
    const cmp = Object.create(AdminProductsComponent.prototype) as AdminProductsComponent;
    (cmp as any).translate = { currentLang: 'en-US' };
    return cmp;
  }

  it('returns empty/raw for invalid and localizes valid ISO', () => {
    const cmp = bare();
    expect(cmp.formatTimestamp('')).toBe('');
    expect(cmp.formatTimestamp('not-a-date')).toBe('not-a-date');
    const out = cmp.formatTimestamp('2020-01-02T03:04:05Z');
    expect(out.length).toBeGreaterThan(0);
    expect(out).not.toBe('2020-01-02T03:04:05Z');
  });
});
