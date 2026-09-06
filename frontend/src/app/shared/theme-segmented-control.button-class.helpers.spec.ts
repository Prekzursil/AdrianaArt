import { ThemeSegmentedControlComponent } from './theme-segmented-control.component';

/** Golden WU theme-segmented-control-button-class — buttonClass. */
describe('ThemeSegmentedControlComponent buttonClass (golden WU)', () => {
  it('adds active chrome when preference matches', () => {
    const cmp = Object.create(ThemeSegmentedControlComponent.prototype) as ThemeSegmentedControlComponent;
    Object.assign(cmp as any, { preference: 'dark', size: 'sm' });
    expect(cmp.buttonClass('light')).toContain('min-h-9');
    expect(cmp.buttonClass('light')).not.toContain('bg-slate-900');
    expect(cmp.buttonClass('dark')).toContain('bg-slate-900');
    Object.assign(cmp as any, { size: 'lg' });
    expect(cmp.buttonClass('light')).toContain('min-h-10');
  });
});
