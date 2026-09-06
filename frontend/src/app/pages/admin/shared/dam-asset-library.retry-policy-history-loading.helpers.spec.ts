import { DamAssetLibraryComponent } from './dam-asset-library.component';

/** Golden WU dam-retry-policy-history-loading — retryPolicyHistoryLoading. */
describe('DamAssetLibraryComponent retryPolicyHistoryLoading (golden WU)', () => {
  it('reflects loading flags by job type', () => {
    const cmp = Object.create(DamAssetLibraryComponent.prototype) as any;
    Object.assign(cmp, { retryPolicyHistoryLoadingByType: { thumbnail: true } });
    expect(cmp.retryPolicyHistoryLoading('thumbnail')).toBe(true);
    expect(cmp.retryPolicyHistoryLoading('other' as any)).toBe(false);
  });
});
