import { saveAdminTableLayout } from './admin-table-layout';

describe('saveAdminTableLayout (golden WU)', () => {
  const key = 'test.admin.table.save';
  afterEach(() => localStorage.removeItem(key));

  it('persists layout JSON with an updated_at stamp', () => {
    saveAdminTableLayout(key, {
      version: 1,
      order: ['a'],
      hidden: [],
      density: 'comfortable',
    });
    const raw = localStorage.getItem(key);
    expect(raw).toBeTruthy();
    const parsed = JSON.parse(raw!);
    expect(parsed.order).toEqual(['a']);
    expect(typeof parsed.updated_at).toBe('string');
    expect(parsed.updated_at.length).toBeGreaterThan(0);
  });
});
