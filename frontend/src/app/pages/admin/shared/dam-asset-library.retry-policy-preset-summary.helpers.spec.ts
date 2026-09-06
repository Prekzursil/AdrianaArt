import { DamAssetLibraryComponent } from './dam-asset-library.component';

/** Golden WU dam-retry-policy-preset-summary — retryPolicyPresetSummary. */
describe('DamAssetLibraryComponent retryPolicyPresetSummary (golden WU)', () => {
  it('loading when empty; joins labels with optional fallback marker', () => {
    const cmp = Object.create(DamAssetLibraryComponent.prototype) as DamAssetLibraryComponent;
    (cmp as any).retryPolicyPresetsByType = {};
    expect(cmp.retryPolicyPresetSummary('thumb' as any)).toBe('loading…');
    (cmp as any).retryPolicyPresetsByType = {
      thumb: [
        { label: 'fast', fallback_used: false },
        { label: 'safe', fallback_used: true },
      ],
    };
    expect(cmp.retryPolicyPresetSummary('thumb' as any)).toBe('fast · safe (fallback)');
  });
});
