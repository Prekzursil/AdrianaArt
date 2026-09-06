import { ThemeSegmentedControlComponent } from './theme-segmented-control.component';

/** Golden WU theme-segmented-control-label-class — labelClass. */
describe('ThemeSegmentedControlComponent labelClass (golden WU)', () => {
  it('returns stacked vs inline label classes', () => {
    const cmp = Object.create(ThemeSegmentedControlComponent.prototype) as ThemeSegmentedControlComponent;
    (cmp as any).layout = 'stacked';
    expect(cmp.labelClass()).toBe('px-1 pb-0.5 text-[11px] leading-tight');
    (cmp as any).layout = 'inline';
    (cmp as any).size = 'lg';
    expect(cmp.labelClass()).toContain('pr-3');
    expect(cmp.labelClass()).toContain('pl-0.5');
  });
});
