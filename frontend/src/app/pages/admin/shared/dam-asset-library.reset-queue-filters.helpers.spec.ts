import { DamAssetLibraryComponent } from './dam-asset-library.component';

/** Golden WU dam-reset-queue-filters -- resetQueueFilters. */
describe('DamAssetLibraryComponent resetQueueFilters (golden WU)', () => {
  it('clears queue filters and reloads jobs', () => {
    const cmp = Object.create(
      DamAssetLibraryComponent.prototype,
    ) as DamAssetLibraryComponent;
    Object.assign(cmp as any, {
      queueStatus: 'failed',
      queueJobType: 'optimize',
      queueTriageState: 'open',
      queueAssignedToUserId: 'u1',
      queueTag: 't',
      queueSlaBreachedOnly: true,
      queueAssetId: 'a1',
      queueCreatedFrom: '2026-01-01',
      queueCreatedTo: '2026-01-02',
      loadJobs: jasmine.createSpy('loadJobs'),
    });
    cmp.resetQueueFilters();
    expect((cmp as any).queueStatus).toBe('');
    expect((cmp as any).queueJobType).toBe('');
    expect((cmp as any).queueTriageState).toBe('');
    expect((cmp as any).queueAssignedToUserId).toBe('');
    expect((cmp as any).queueTag).toBe('');
    expect((cmp as any).queueSlaBreachedOnly).toBe(false);
    expect((cmp as any).queueAssetId).toBe('');
    expect((cmp as any).queueCreatedFrom).toBe('');
    expect((cmp as any).queueCreatedTo).toBe('');
    expect((cmp as any).loadJobs).toHaveBeenCalledWith(true);
  });
});
