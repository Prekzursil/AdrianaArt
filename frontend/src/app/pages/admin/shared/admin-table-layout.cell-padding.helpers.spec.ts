import { adminTableCellPaddingClass } from './admin-table-layout';

/** Golden WU admin-table-cell-padding-fn -- adminTableCellPaddingClass. */
describe('adminTableCellPaddingClass (golden WU)', () => {
  it('maps compact and comfortable densities', () => {
    expect(adminTableCellPaddingClass('compact')).toBe('px-3 py-1.5');
    expect(adminTableCellPaddingClass('comfortable')).toBe('px-3 py-2');
  });
});
