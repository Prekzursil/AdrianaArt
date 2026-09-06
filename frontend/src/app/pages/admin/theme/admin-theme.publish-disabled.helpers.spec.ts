import { signal } from '@angular/core';
import { AdminThemeComponent } from './admin-theme.component';

/** Golden WU theme-publish-disabled — publishDisabled. */
describe('AdminThemeComponent publishDisabled (golden WU)', () => {
  function bare(busy: boolean, dirty: boolean, contrastFail: boolean): AdminThemeComponent {
    const cmp = Object.create(AdminThemeComponent.prototype) as AdminThemeComponent;
    Object.assign(cmp as any, {
      busy: signal(busy),
      dirty: signal(dirty),
      hasContrastFailures: () => contrastFail,
    });
    return cmp;
  }

  it('disables when busy, dirty, or contrast failures exist', () => {
    expect(bare(false, false, false).publishDisabled).toBe(false);
    expect(bare(true, false, false).publishDisabled).toBe(true);
    expect(bare(false, true, false).publishDisabled).toBe(true);
    expect(bare(false, false, true).publishDisabled).toBe(true);
  });
});
