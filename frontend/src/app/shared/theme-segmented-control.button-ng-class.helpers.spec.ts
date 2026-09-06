import { ThemeSegmentedControlComponent } from './theme-segmented-control.component';

/** Golden WU theme-segmented-control-button-ng-class — buttonNgClass. */
describe('ThemeSegmentedControlComponent buttonNgClass (golden WU)', () => {
  it('layers stretch and layout modifiers on buttonClass', () => {
    const cmp = Object.create(ThemeSegmentedControlComponent.prototype) as ThemeSegmentedControlComponent;
    Object.assign(cmp as any, {
      preference: 'system',
      size: 'sm',
      stretch: true,
      layout: 'stacked',
      showLabels: false,
    });
    const stacked = cmp.buttonNgClass('system');
    expect(stacked).toContain('flex-1');
    expect(stacked).toContain('flex-col');
    Object.assign(cmp as any, { layout: 'horizontal', showLabels: true, stretch: false });
    const labeled = cmp.buttonNgClass('system');
    expect(labeled).toContain('gap-2');
    expect(labeled).not.toContain('flex-1');
  });
});
