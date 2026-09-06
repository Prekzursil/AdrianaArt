import { TableLayoutModalComponent } from './table-layout-modal.component';

/** Golden WU table-layout-modal-is-required — isRequired. */
describe('TableLayoutModalComponent isRequired (golden WU)', () => {
  it('is true only when column required is set', () => {
    const cmp = Object.create(TableLayoutModalComponent.prototype) as TableLayoutModalComponent;
    Object.assign(cmp as any, {
      columns: [{ id: 'sku', required: true }, { id: 'qty', required: false }],
    });
    expect(cmp.isRequired('sku')).toBe(true);
    expect(cmp.isRequired('qty')).toBe(false);
    expect(cmp.isRequired('missing')).toBe(false);
  });
});
