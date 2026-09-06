import { ThemeSegmentedControlComponent } from './theme-segmented-control.component';

/** Golden WU theme-segmented-control-icon-box-class — iconBoxClass. */
describe('ThemeSegmentedControlComponent iconBoxClass (golden WU)', () => {
  it('sizes icon box by layout and size', () => {
    const cmp = Object.create(ThemeSegmentedControlComponent.prototype) as ThemeSegmentedControlComponent;
    (cmp as any).layout = 'inline';
    (cmp as any).size = 'sm';
    expect(cmp.iconBoxClass()).toBe('h-8 w-8');
    (cmp as any).layout = 'stacked';
    (cmp as any).size = 'lg';
    expect(cmp.iconBoxClass()).toBe('h-8 w-8');
    (cmp as any).size = 'sm';
    expect(cmp.iconBoxClass()).toBe('h-7 w-7');
  });
});
