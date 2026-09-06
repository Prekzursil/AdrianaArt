import { adminTableLayoutStorageKey } from './admin-table-layout';

/** Golden WU admin-table-layout-storage-key-fn -- adminTableLayoutStorageKey. */
describe('adminTableLayoutStorageKey (golden WU)', () => {
  it('normalizes table id and defaults anonymous user', () => {
    expect(adminTableLayoutStorageKey('Orders!!', null)).toBe(
      'admin.tableLayout.v1:orders:anonymous',
    );
    expect(adminTableLayoutStorageKey('orders', 'u1')).toBe(
      'admin.tableLayout.v1:orders:u1',
    );
  });
});
