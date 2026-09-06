import { DamAssetLibraryComponent } from './dam-asset-library.component';

/** Golden WU dam-retry-delay-preview — retryDelayPreview. */
describe('DamAssetLibraryComponent retryDelayPreview (golden WU)', () => {
  it('invalid when empty parse; else numbered seconds list', () => {
    const cmp = Object.create(DamAssetLibraryComponent.prototype) as DamAssetLibraryComponent;
    (cmp as any).retryPolicyDraft = () => ({ scheduleText: 'x' });
    (cmp as any).parseScheduleInput = () => [];
    expect(cmp.retryDelayPreview('thumb' as any)).toBe('invalid schedule');
    (cmp as any).parseScheduleInput = () => [5, 30];
    expect(cmp.retryDelayPreview('thumb' as any)).toBe('#1: 5s · #2: 30s');
  });
});
