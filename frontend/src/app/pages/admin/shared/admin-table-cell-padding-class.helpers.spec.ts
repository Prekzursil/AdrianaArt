import { adminTableCellPaddingClass } from './admin-table-layout';

describe('adminTableCellPaddingClass (golden WU)', () => {
  it('maps compact vs comfortable density', () => {
    expect(adminTableCellPaddingClass('compact')).toBe('px-3 py-1.5');
    expect(adminTableCellPaddingClass('comfortable')).toBe('px-3 py-2');
  });
});
