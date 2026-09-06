import { CmsPageBlocksComponent } from './cms-page-blocks.component';

/** Golden WU cms-page-blocks-focal-position — focalPosition. */
describe('CmsPageBlocksComponent focalPosition (golden WU)', () => {
  it('clamps and formats focal percentages', () => {
    const cmp = Object.create(CmsPageBlocksComponent.prototype) as CmsPageBlocksComponent;
    expect(cmp.focalPosition(undefined, undefined)).toBe('50% 50%');
    expect(cmp.focalPosition(-10, 150)).toBe('0% 100%');
    expect(cmp.focalPosition(25.6, 74.4)).toBe('26% 74%');
  });
});
