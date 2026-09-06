import { AdminProductsComponent } from './admin-products.component';

/** Golden WU products-parse-audit-money — parseAuditMoney. */
describe('AdminProductsComponent parseAuditMoney (golden WU)', () => {
  it('parses numbers/strings and rejects junk', () => {
    const cmp = Object.create(AdminProductsComponent.prototype) as AdminProductsComponent;
    const fn = (AdminProductsComponent.prototype as any).parseAuditMoney as (
      this: AdminProductsComponent,
      value: unknown,
    ) => number | null;
    expect(fn.call(cmp, null)).toBeNull();
    expect(fn.call(cmp, 'nope')).toBeNull();
    expect(fn.call(cmp, 12.345)).toBe(12.35);
    expect(fn.call(cmp, '10.1')).toBe(10.1);
    expect(fn.call(cmp, 5n)).toBe(5);
  });
});
