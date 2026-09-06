import { signal } from '@angular/core';
import { AdminThemeComponent } from './admin-theme.component';

/** Golden WU theme-contrast-for — contrastFor. */
describe('AdminThemeComponent contrastFor (golden WU)', () => {
  function bare(map: Record<string, any>): AdminThemeComponent {
    const cmp = Object.create(AdminThemeComponent.prototype) as AdminThemeComponent;
    Object.assign(cmp as any, { contrast: signal(map) });
    return cmp;
  }

  it('looks up contrast validation by token name', () => {
    const hit = { ok: true };
    expect(bare({ primary: hit }).contrastFor('primary')).toBe(hit);
    expect(bare({ primary: hit }).contrastFor('missing')).toBeUndefined();
  });
});
