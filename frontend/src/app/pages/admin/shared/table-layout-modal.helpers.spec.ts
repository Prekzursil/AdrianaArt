import { TableLayoutModalComponent } from './table-layout-modal.component';

/** Golden WU table-layout-modal-helpers. */
describe('TableLayoutModalComponent column helpers (golden WU)', () => {
  function bare(): TableLayoutModalComponent {
    const cmp = Object.create(TableLayoutModalComponent.prototype) as TableLayoutModalComponent;
    Object.assign(cmp as any, {
      columns: [
        { id: 'id', required: true, labelKey: 'cols.id' },
        { id: 'name', required: false, labelKey: 'cols.name' },
      ],
    });
    return cmp;
  }

  it('isRequired and labelKey resolve column defs', () => {
    const cmp = bare();
    expect(cmp.isRequired('id')).toBe(true);
    expect(cmp.isRequired('name')).toBe(false);
    expect(cmp.isRequired('missing')).toBe(false);
    expect(cmp.labelKey('id')).toBe('cols.id');
    expect(cmp.labelKey('missing')).toBe('missing');
  });
});
