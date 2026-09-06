import { sanitizeAdminTableLayout } from './admin-table-layout';

describe('sanitizeAdminTableLayout (golden WU)', () => {
  const columns = [
    { id: 'id', required: true },
    { id: 'name' },
    { id: 'sku' },
  ];

  it('falls back on bad input and repairs order/hidden/density', () => {
    expect(sanitizeAdminTableLayout(null, columns).order).toEqual(['id', 'name', 'sku']);
    const cleaned = sanitizeAdminTableLayout(
      {
        version: 1,
        order: ['sku', 'nope', 'sku', 'name'],
        hidden: ['name', 'id', 'ghost'],
        density: 'compact',
      },
      columns,
    );
    expect(cleaned.order).toEqual(['sku', 'name', 'id']);
    expect(cleaned.hidden).toEqual(['name']);
    expect(cleaned.density).toBe('compact');
  });
});
