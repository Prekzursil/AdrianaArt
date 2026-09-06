import { DamAssetLibraryComponent } from './dam-asset-library.component';

/** Golden WU dam-retry-policy-error — retryPolicyError. */
describe('DamAssetLibraryComponent retryPolicyError (golden WU)', () => {
  it('returns row error or null', () => {
    const cmp = Object.create(DamAssetLibraryComponent.prototype) as any;
    Object.assign(cmp, { retryPolicyRowErrors: { thumbnail: 'boom' } });
    expect(cmp.retryPolicyError('thumbnail')).toBe('boom');
    expect(cmp.retryPolicyError('other' as any)).toBeNull();
  });
});
