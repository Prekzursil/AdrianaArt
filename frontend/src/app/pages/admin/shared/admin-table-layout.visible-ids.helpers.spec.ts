import { visibleAdminTableColumnIds } from './admin-table-layout';

/** Golden WU visible-admin-table-column-ids-fn -- visibleAdminTableColumnIds. */
describe('visibleAdminTableColumnIds (golden WU)', () => {
  it('keeps required columns even when hidden', () => {
    const cols = [
      { id: 'id', required: true },
      { id: 'name' },
      { id: 'status' },
    ];
    const ids = visibleAdminTableColumnIds(
      { version: 1, order: ['status', 'name', 'id'], hidden: ['name', 'id'], density: 'comfortable' },
      cols,
    );
    expect(ids).toEqual(['status', 'id']);
  });
});
