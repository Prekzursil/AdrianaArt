import { AdminInventoryComponent } from './admin-inventory.component';

/** Golden WU admin-inventory-save-note -- saveNote. */
describe('AdminInventoryComponent saveNote (golden WU)', () => {
  it('returns early when row is not dirty', () => {
    const cmp = Object.create(AdminInventoryComponent.prototype) as AdminInventoryComponent;
    const row: any = { isSaving: false, isDirty: false, draftSupplier: '', draftNote: '', draftDesiredQuantity: '' };
    cmp.saveNote(row);
    expect(row.isSaving).toBe(false);
  });
});
