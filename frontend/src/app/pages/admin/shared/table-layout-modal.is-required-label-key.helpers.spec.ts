import { TableLayoutModalComponent } from './table-layout-modal.component';

/** Golden WU table-layout-is-required-label-key — isRequired/labelKey. */
describe('TableLayoutModalComponent isRequired/labelKey (golden WU)', () => {
  it('reads required/labelKey from column defs with fallbacks', () => {
    const cmp = Object.create(TableLayoutModalComponent.prototype) as TableLayoutModalComponent;
    (cmp as any).columns = [
      { id: 'id', required: true, labelKey: 'adminUi.cols.id' },
      { id: 'name', required: false, labelKey: 'adminUi.cols.name' },
      { id: 'mystery' },
    ];
    expect(cmp.isRequired('id')).toBe(true);
    expect(cmp.isRequired('name')).toBe(false);
    expect(cmp.isRequired('missing')).toBe(false);
    expect(cmp.labelKey('id')).toBe('adminUi.cols.id');
    expect(cmp.labelKey('mystery')).toBe('mystery');
    expect(cmp.labelKey('missing')).toBe('missing');
  });
});
