import { loadAdminTableLayout } from './admin-table-layout';

/** Golden WU load-admin-table-layout-fn -- loadAdminTableLayout. */
describe('loadAdminTableLayout (golden WU)', () => {
  const key = 'admin.tableLayout.v1:test:u';
  const cols = [{ id: 'a' }, { id: 'b' }];

  afterEach(() => localStorage.clear());

  it('returns default when empty and sanitizes stored payload', () => {
    expect(loadAdminTableLayout(key, cols).order).toEqual(['a', 'b']);
    localStorage.setItem(
      key,
      JSON.stringify({ version: 1, order: ['b'], hidden: ['a'], density: 'compact' }),
    );
    const layout = loadAdminTableLayout(key, cols);
    expect(layout.order).toEqual(['b', 'a']);
    expect(layout.hidden).toEqual(['a']);
    expect(layout.density).toBe('compact');
  });
});
