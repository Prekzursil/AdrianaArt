import { signal } from '@angular/core';
import { AdminThemeComponent } from './admin-theme.component';

/** Golden WU theme-current-dirty-helpers. */
describe('AdminThemeComponent current/dirty helpers (golden WU)', () => {
  function bare(): AdminThemeComponent {
    const cmp = Object.create(AdminThemeComponent.prototype) as AdminThemeComponent;
    Object.assign(cmp as any, {
      values: signal({ primary: '#111' }),
      dirty: signal(true),
    });
    return cmp;
  }

  it('currentValue and hasUnsavedChanges', () => {
    const cmp = bare();
    expect((AdminThemeComponent.prototype as any).currentValue.call(cmp, 'primary')).toBe('#111');
    expect((AdminThemeComponent.prototype as any).currentValue.call(cmp, 'missing')).toBe('');
    expect(cmp.hasUnsavedChanges()).toBe(true);
    (cmp as any).dirty.set(false);
    expect(cmp.hasUnsavedChanges()).toBe(false);
  });
});
