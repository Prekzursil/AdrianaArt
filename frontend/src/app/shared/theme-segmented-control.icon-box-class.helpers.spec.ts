import { ThemeSegmentedControlComponent } from './theme-segmented-control.component';

/** Golden WU theme-icon-box-class — iconBoxClass. */
describe('ThemeSegmentedControlComponent iconBoxClass (golden WU)', () => {
  function bare(layout: string, size: string): ThemeSegmentedControlComponent {
    const cmp = Object.create(
      ThemeSegmentedControlComponent.prototype,
    ) as ThemeSegmentedControlComponent;
    Object.assign(cmp as any, { layout, size });
    return cmp;
  }

  it('sizes icon box for stacked vs inline layouts', () => {
    expect(bare('stacked', 'lg').iconBoxClass()).toBe('h-8 w-8');
    expect(bare('stacked', 'md').iconBoxClass()).toBe('h-7 w-7');
    expect(bare('inline', 'lg').iconBoxClass()).toBe('h-9 w-9');
    expect(bare('inline', 'md').iconBoxClass()).toBe('h-8 w-8');
  });
});
