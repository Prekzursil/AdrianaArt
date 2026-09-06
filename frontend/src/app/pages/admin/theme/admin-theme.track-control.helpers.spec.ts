import { AdminThemeComponent } from './admin-theme.component';

/** Golden WU theme-track-control — trackControl. */
describe('AdminThemeComponent trackControl (golden WU)', () => {
  it('returns the control name', () => {
    const cmp = Object.create(AdminThemeComponent.prototype) as AdminThemeComponent;
    expect((cmp as any).trackControl(0, { name: 'color-primary' })).toBe('color-primary');
    expect((cmp as any).trackControl(3, { name: 'font-body' })).toBe('font-body');
  });
});
