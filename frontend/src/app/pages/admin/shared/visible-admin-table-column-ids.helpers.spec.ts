import { visibleAdminTableColumnIds } from './admin-table-layout';

describe('visibleAdminTableColumnIds (golden WU)', () => {
  it('keeps required columns even when hidden', () => {
    const columns = [
      { id: 'id', required: true },
      { id: 'name' },
      { id: 'sku' },
    ];
    const layout = {
      version: 1 as const,
      order: ['sku', 'name', 'id'],
      hidden: ['name', 'id'],
      density: 'comfortable' as const,
    };
    expect(visibleAdminTableColumnIds(layout, columns)).toEqual(['sku', 'id']);
  });
});
