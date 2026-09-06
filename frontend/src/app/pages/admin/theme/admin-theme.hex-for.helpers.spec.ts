import { AdminThemeComponent } from './admin-theme.component';

/** Golden WU theme-hex-for — hexFor. */
describe('AdminThemeComponent hexFor (golden WU)', () => {
  it('converts currentValue triplet to hex', () => {
    const cmp = Object.create(AdminThemeComponent.prototype) as AdminThemeComponent;
    (cmp as any).currentValue = (name: string) => (name === '--accent' ? '255 0 128' : '');
    expect((cmp as any).hexFor('--accent')).toBe('#ff0080');
  });
});
