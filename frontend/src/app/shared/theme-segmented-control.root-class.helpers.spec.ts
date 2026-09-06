import { ThemeSegmentedControlComponent } from './theme-segmented-control.component';

/** Golden WU theme-segmented-control-root-class — rootClass. */
describe('ThemeSegmentedControlComponent rootClass (golden WU)', () => {
  it('composes display/chrome/gap/width from inputs', () => {
    const cmp = Object.create(ThemeSegmentedControlComponent.prototype) as ThemeSegmentedControlComponent;
    Object.assign(cmp as any, { stretch: false, variant: 'standalone', size: 'sm' });
    const standalone = cmp.rootClass();
    expect(standalone).toContain('inline-flex');
    expect(standalone).toContain('border');
    expect(standalone).toContain('gap-0.5');
    Object.assign(cmp as any, { stretch: true, variant: 'embedded', size: 'lg' });
    const embedded = cmp.rootClass();
    expect(embedded).toContain('flex');
    expect(embedded).toContain('p-0');
    expect(embedded).toContain('gap-1');
    expect(embedded).toContain('w-full');
  });
});
