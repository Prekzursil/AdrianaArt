import { AdminProductsComponent } from './admin-products.component';

/** Golden WU products-parse-local-datetime — parseLocalDateTime. */
describe('AdminProductsComponent parseLocalDateTime (golden WU)', () => {
  it('parses valid dates and rejects empty/invalid', () => {
    const cmp = Object.create(AdminProductsComponent.prototype) as AdminProductsComponent;
    const fn = (AdminProductsComponent.prototype as any).parseLocalDateTime as (
      this: AdminProductsComponent,
      value: string,
    ) => number | null;
    expect(fn.call(cmp, '')).toBeNull();
    expect(fn.call(cmp, '   ')).toBeNull();
    expect(fn.call(cmp, 'not-a-date')).toBeNull();
    const ms = fn.call(cmp, '2026-09-06T12:00:00');
    expect(typeof ms).toBe('number');
    expect(ms).toBeGreaterThan(0);
  });
});
