import { adminTableLayoutStorageKey } from './admin-table-layout';

describe('adminTableLayoutStorageKey (golden WU)', () => {
  it('normalizes table id and defaults anonymous user', () => {
    expect(adminTableLayoutStorageKey(' Orders!! ', 'u1')).toBe(
      'admin.tableLayout.v1:orders:u1',
    );
    expect(adminTableLayoutStorageKey('', null)).toBe(
      'admin.tableLayout.v1:table:anonymous',
    );
  });
});
