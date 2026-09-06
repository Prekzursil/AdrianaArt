import { sanitizeAdminTableLayout } from './admin-table-layout';

/** Golden WU sanitize-admin-table-layout-fn -- sanitizeAdminTableLayout. */
describe('sanitizeAdminTableLayout (golden WU)', () => {
  const cols = [
    { id: 'id', required: true },
    { id: 'name' },
    { id: 'status' },
  ];

  it('drops unknown ids, keeps required visible, and fills missing order', () => {
    const layout = sanitizeAdminTableLayout(
      {
        version: 1,
        order: ['status', 'ghost', 'name'],
        hidden: ['name', 'id', 'ghost'],
        density: 'compact',
      },
      cols,
    );
    expect(layout.order).toEqual(['status', 'name', 'id']);
    expect(layout.hidden).toEqual(['name']);
    expect(layout.density).toBe('compact');
  });
});
