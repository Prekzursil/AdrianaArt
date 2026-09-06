import { ThemeSegmentedControlComponent } from './theme-segmented-control.component';

/** Golden WU theme-label-class — labelClass. */
describe('ThemeSegmentedControlComponent labelClass (golden WU)', () => {
  function bare(layout: string, size: string): ThemeSegmentedControlComponent {
    const cmp = Object.create(
      ThemeSegmentedControlComponent.prototype,
    ) as ThemeSegmentedControlComponent;
    Object.assign(cmp as any, { layout, size });
    return cmp;
  }

  it('uses stacked compact label vs inline truncate label', () => {
    expect(bare('stacked', 'lg').labelClass()).toBe('px-1 pb-0.5 text-[11px] leading-tight');
    expect(bare('inline', 'lg').labelClass()).toContain('pr-3 text-sm truncate');
    expect(bare('inline', 'lg').labelClass()).toContain('pl-0.5');
    expect(bare('inline', 'md').labelClass()).toContain('pl-0');
  });
});
