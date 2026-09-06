import { TableLayoutModalComponent } from './table-layout-modal.component';

/** Golden WU table-layout-modal-toggle-column — toggleColumn. */
describe('TableLayoutModalComponent toggleColumn (golden WU)', () => {
  it('toggles draftHidden except for required columns', () => {
    const cmp = Object.create(TableLayoutModalComponent.prototype) as TableLayoutModalComponent;
    Object.assign(cmp as any, {
      draftHidden: new Set<string>(['b']),
      isRequired: (id: string) => id === 'a',
    });
    cmp.toggleColumn('a');
    expect((cmp as any).draftHidden.has('a')).toBe(false);
    expect((cmp as any).draftHidden.has('b')).toBe(true);
    cmp.toggleColumn('b');
    expect((cmp as any).draftHidden.has('b')).toBe(false);
    cmp.toggleColumn('c');
    expect((cmp as any).draftHidden.has('c')).toBe(true);
  });
});
