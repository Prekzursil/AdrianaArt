import { DamAssetLibraryComponent } from './dam-asset-library.component';

/** Golden WU dam-retry-policy-history-has-more — retryPolicyHistoryHasMore. */
describe('DamAssetLibraryComponent retryPolicyHistoryHasMore (golden WU)', () => {
  it('false without meta; else page < total_pages', () => {
    const cmp = Object.create(DamAssetLibraryComponent.prototype) as DamAssetLibraryComponent;
    (cmp as any).retryPolicyHistoryMeta = {};
    expect(cmp.retryPolicyHistoryHasMore('thumb' as any)).toBe(false);
    (cmp as any).retryPolicyHistoryMeta = { thumb: { page: 1, total_pages: 1 } };
    expect(cmp.retryPolicyHistoryHasMore('thumb' as any)).toBe(false);
    (cmp as any).retryPolicyHistoryMeta = { thumb: { page: 1, total_pages: 3 } };
    expect(cmp.retryPolicyHistoryHasMore('thumb' as any)).toBe(true);
  });
});
