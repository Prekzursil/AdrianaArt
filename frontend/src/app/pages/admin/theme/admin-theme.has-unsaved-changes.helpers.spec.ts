import { AdminThemeComponent } from './admin-theme.component';

/** Golden WU theme-has-unsaved-changes — hasUnsavedChanges. */
describe('AdminThemeComponent hasUnsavedChanges (golden WU)', () => {
  it('mirrors dirty()', () => {
    const cmp = Object.create(AdminThemeComponent.prototype) as AdminThemeComponent;
    (cmp as any).dirty = () => false;
    expect(cmp.hasUnsavedChanges()).toBe(false);
    (cmp as any).dirty = () => true;
    expect(cmp.hasUnsavedChanges()).toBe(true);
  });
});
