import { saveAdminTableLayout } from './admin-table-layout';

/** Golden WU save-admin-table-layout-fn -- saveAdminTableLayout. */
describe('saveAdminTableLayout (golden WU)', () => {
  const key = 'admin.tableLayout.v1:save:u';

  afterEach(() => localStorage.clear());

  it('persists layout with an updated_at timestamp', () => {
    saveAdminTableLayout(key, {
      version: 1,
      order: ['a'],
      hidden: [],
      density: 'comfortable',
    });
    const raw = JSON.parse(localStorage.getItem(key) || '{}');
    expect(raw.order).toEqual(['a']);
    expect(typeof raw.updated_at).toBe('string');
    expect(raw.updated_at.length).toBeGreaterThan(0);
  });
});
