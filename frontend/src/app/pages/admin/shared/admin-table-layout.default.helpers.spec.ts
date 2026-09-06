import { defaultAdminTableLayout } from './admin-table-layout';

/** Golden WU default-admin-table-layout-fn -- defaultAdminTableLayout. */
describe('defaultAdminTableLayout (golden WU)', () => {
  it('orders all columns and uses comfortable density', () => {
    expect(defaultAdminTableLayout([{ id: 'a' }, { id: 'b', required: true }])).toEqual({
      version: 1,
      order: ['a', 'b'],
      hidden: [],
      density: 'comfortable',
    });
  });
});
