import { CmsGlobalSectionBlocksComponent } from './cms-global-section-blocks.component';

/** Golden WU cms-global-section-blocks-focal-position — focalPosition. */
describe('CmsGlobalSectionBlocksComponent focalPosition (golden WU)', () => {
  it('clamps and formats focal percentages', () => {
    const cmp = Object.create(CmsGlobalSectionBlocksComponent.prototype) as CmsGlobalSectionBlocksComponent;
    expect(cmp.focalPosition()).toBe('50% 50%');
    expect(cmp.focalPosition(0, 100)).toBe('0% 100%');
    expect(cmp.focalPosition(12.2, 88.8)).toBe('12% 89%');
  });
});
