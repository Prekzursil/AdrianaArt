import { CmsGlobalSectionBlocksComponent } from './cms-global-section-blocks.component';

/** Golden WU cms-global-section-blocks-loading-rows — loadingRows. */
describe('CmsGlobalSectionBlocksComponent loadingRows (golden WU)', () => {
  it('returns at least one skeleton row index', () => {
    const cmp = Object.create(CmsGlobalSectionBlocksComponent.prototype) as CmsGlobalSectionBlocksComponent;
    (cmp as any).loadingSkeletonCount = 0;
    expect(cmp.loadingRows()).toEqual([0]);
    (cmp as any).loadingSkeletonCount = 3;
    expect(cmp.loadingRows()).toEqual([0, 1, 2]);
  });
});
