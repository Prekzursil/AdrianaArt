import { AdminProductsComponent } from './admin-products.component';

/** Golden WU products-format-audit-value — formatAuditValue. */
describe('AdminProductsComponent formatAuditValue (golden WU)', () => {
  function createCmp() {
    return Object.create(AdminProductsComponent.prototype) as AdminProductsComponent;
  }

  it('stringifies scalars and objects', () => {
    const cmp = createCmp();
    expect(cmp.formatAuditValue(null)).toBe('—');
    expect(cmp.formatAuditValue(undefined)).toBe('—');
    expect(cmp.formatAuditValue('hi')).toBe('hi');
    expect(cmp.formatAuditValue(12)).toBe('12');
    expect(cmp.formatAuditValue(true)).toBe('true');
    expect(cmp.formatAuditValue({ a: 1 })).toBe('{"a":1}');
  });
});
