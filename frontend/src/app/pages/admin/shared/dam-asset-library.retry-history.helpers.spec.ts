import { signal } from '@angular/core';
import { DamAssetLibraryComponent } from './dam-asset-library.component';

/** Golden WU dam-retry-history-toggle-helpers. */
describe('DamAssetLibraryComponent retry history helpers (golden WU)', () => {
  function bare(): DamAssetLibraryComponent {
    const cmp = Object.create(DamAssetLibraryComponent.prototype) as DamAssetLibraryComponent;
    Object.assign(cmp as any, {
      retryPolicyHistoryOpen: signal(new Set<string>()),
      loadRetryPolicyPresets: jasmine.createSpy('presets'),
      loadRetryPolicyHistory: jasmine.createSpy('history'),
    });
    return cmp;
  }

  it('toggle opens then closes history set', () => {
    const cmp = bare();
    expect(cmp.isRetryPolicyHistoryOpen('thumb' as any)).toBe(false);
    cmp.toggleRetryPolicyHistory('thumb' as any);
    expect(cmp.isRetryPolicyHistoryOpen('thumb' as any)).toBe(true);
    expect((cmp as any).loadRetryPolicyPresets).toHaveBeenCalledWith('thumb');
    cmp.toggleRetryPolicyHistory('thumb' as any);
    expect(cmp.isRetryPolicyHistoryOpen('thumb' as any)).toBe(false);
  });
});
