import { AdminThemeComponent } from './admin-theme.component';

describe('AdminThemeComponent hasUnsavedChanges (golden WU)', () => {
  it('mirrors dirty signal', () => {
    const cmp = Object.create(AdminThemeComponent.prototype) as AdminThemeComponent;
    (cmp as any).dirty = () => false;
    expect(cmp.hasUnsavedChanges()).toBe(false);
    (cmp as any).dirty = () => true;
    expect(cmp.hasUnsavedChanges()).toBe(true);
  });
});
