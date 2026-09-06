import { AdminThemeComponent } from './admin-theme.component';

/** Golden WU theme-track-version — trackVersion. */
describe('AdminThemeComponent trackVersion (golden WU)', () => {
  it('returns the version number', () => {
    const cmp = Object.create(AdminThemeComponent.prototype) as AdminThemeComponent;
    expect((cmp as any).trackVersion(0, { version: 12 })).toBe(12);
    expect((cmp as any).trackVersion(1, { version: 3 })).toBe(3);
  });
});
