import { defaultAdminTableLayout } from './admin-table-layout';

describe('defaultAdminTableLayout (golden WU)', () => {
  it('seeds comfortable density with column order and no hidden ids', () => {
    expect(defaultAdminTableLayout([{ id: 'a' }, { id: 'b', required: true }])).toEqual({
      version: 1,
      order: ['a', 'b'],
      hidden: [],
      density: 'comfortable',
    });
  });
});
