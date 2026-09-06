import { AdminProductsComponent } from './admin-products.component';

describe('AdminProductsComponent formatAuditValue (golden WU)', () => {
  it('stringifies primitives/objects and falls back for null/circular', () => {
    const cmp = Object.create(AdminProductsComponent.prototype) as AdminProductsComponent;
    expect(cmp.formatAuditValue(null)).toBe('—');
    expect(cmp.formatAuditValue(undefined)).toBe('—');
    expect(cmp.formatAuditValue('hi')).toBe('hi');
    expect(cmp.formatAuditValue(3)).toBe('3');
    expect(cmp.formatAuditValue(true)).toBe('true');
    expect(cmp.formatAuditValue({ a: 1 })).toBe('{"a":1}');
    const circular: any = {};
    circular.self = circular;
    expect(cmp.formatAuditValue(circular)).toBe('—');
  });
});
