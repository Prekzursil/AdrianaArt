import { AdminThemeComponent } from './admin-theme.component';

/** Golden WU theme-current-value — currentValue. */
describe('AdminThemeComponent currentValue (golden WU)', () => {
  it('reads token from values map with empty fallback', () => {
    const cmp = Object.create(AdminThemeComponent.prototype) as AdminThemeComponent;
    (cmp as any).values = () => ({ '--accent': '10 20 30' });
    expect((cmp as any).currentValue('--accent')).toBe('10 20 30');
    expect((cmp as any).currentValue('--missing')).toBe('');
  });
});
