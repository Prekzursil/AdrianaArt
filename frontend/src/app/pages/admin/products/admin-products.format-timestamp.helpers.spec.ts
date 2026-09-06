import { AdminProductsComponent } from './admin-products.component';

describe('AdminProductsComponent formatTimestamp (golden WU)', () => {
  it('returns raw/empty for invalid; otherwise toLocaleString', () => {
    const cmp = Object.create(AdminProductsComponent.prototype) as AdminProductsComponent;
    (cmp as any).translate = { currentLang: 'en-US' };
    expect(cmp.formatTimestamp('')).toBe('');
    expect(cmp.formatTimestamp('not-a-date')).toBe('not-a-date');
    const iso = '2024-01-15T12:00:00.000Z';
    const out = cmp.formatTimestamp(iso);
    expect(out.length).toBeGreaterThan(0);
    expect(out).not.toBe('not-a-date');
  });
});
