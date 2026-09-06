import { loadAdminTableLayout } from './admin-table-layout';

describe('loadAdminTableLayout (golden WU)', () => {
  const columns = [{ id: 'id', required: true }, { id: 'name' }];
  const key = 'test.admin.table.layout';

  afterEach(() => localStorage.removeItem(key));

  it('returns default when missing/invalid and hydrates a valid payload', () => {
    expect(loadAdminTableLayout(key, columns)).toEqual({
      version: 1,
      order: ['id', 'name'],
      hidden: [],
      density: 'comfortable',
    });
    localStorage.setItem(key, '{not-json');
    expect(loadAdminTableLayout(key, columns).density).toBe('comfortable');
    localStorage.setItem(
      key,
      JSON.stringify({ version: 1, order: ['name'], hidden: ['name'], density: 'compact' }),
    );
    const layout = loadAdminTableLayout(key, columns);
    expect(layout.order).toEqual(['name', 'id']);
    expect(layout.hidden).toEqual(['name']);
    expect(layout.density).toBe('compact');
  });
});
