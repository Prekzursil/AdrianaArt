import { TableLayoutModalComponent } from './table-layout-modal.component';

/** Golden WU table-layout-modal-label-key — labelKey. */
describe('TableLayoutModalComponent labelKey (golden WU)', () => {
  it('returns column labelKey or the id', () => {
    const cmp = Object.create(TableLayoutModalComponent.prototype) as TableLayoutModalComponent;
    Object.assign(cmp as any, {
      columns: [{ id: 'sku', labelKey: 'admin.sku' }, { id: 'qty' }],
    });
    expect(cmp.labelKey('sku')).toBe('admin.sku');
    expect(cmp.labelKey('qty')).toBe('qty');
    expect(cmp.labelKey('missing')).toBe('missing');
  });
});
