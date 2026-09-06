import { CatalogService } from './catalog.service';

/** Golden WU catalog-normalize-product — normalizeProduct. */
describe('CatalogService normalizeProduct (golden WU)', () => {
  it('parses money fields and preserves null sale fields', () => {
    const svc = Object.create(CatalogService.prototype) as CatalogService;
    const out = (svc as any).normalizeProduct({
      id: 'p1',
      base_price: '12.5',
      sale_price: null,
      sale_value: '3',
    });
    expect(out.id).toBe('p1');
    expect(out.base_price).toBe(12.5);
    expect(out.sale_price).toBeNull();
    expect(out.sale_value).toBe(3);
  });
});
