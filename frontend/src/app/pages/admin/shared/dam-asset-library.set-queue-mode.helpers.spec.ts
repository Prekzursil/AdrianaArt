import { DamAssetLibraryComponent } from './dam-asset-library.component';

/** Golden WU dam-set-queue-mode — setQueueMode. */
describe('DamAssetLibraryComponent setQueueMode (golden WU)', () => {
  it('updates mode and reloads jobs for dead_letter defaults', () => {
    const cmp = Object.create(DamAssetLibraryComponent.prototype) as DamAssetLibraryComponent;
    let loads = 0;
    Object.assign(cmp as any, {
      queueMode: 'pipeline',
      queueStatus: 'failed',
      queueTriageState: '',
      loadJobs: () => {
        loads += 1;
      },
    });
    cmp.setQueueMode('pipeline');
    expect(loads).toBe(0);
    cmp.setQueueMode('dead_letter');
    expect((cmp as any).queueMode).toBe('dead_letter');
    expect((cmp as any).queueStatus).toBe('');
    expect((cmp as any).queueTriageState).toBe('open');
    expect(loads).toBe(1);
  });
});
