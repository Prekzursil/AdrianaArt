import { DamAssetLibraryComponent } from './dam-asset-library.component';

/** Golden WU dam-switch-tab -- switchTab. */
describe('DamAssetLibraryComponent switchTab (golden WU)', () => {
  it('starts queue polling and loads jobs for queue tab', () => {
    const cmp = Object.create(
      DamAssetLibraryComponent.prototype,
    ) as DamAssetLibraryComponent;
    Object.assign(cmp as any, {
      tab: { set: jasmine.createSpy('tabSet') },
      retryPolicyRollbackPreview: { set: jasmine.createSpy('previewSet') },
      startQueuePolling: jasmine.createSpy('startQueuePolling'),
      loadJobs: jasmine.createSpy('loadJobs'),
      loadRetryPolicies: jasmine.createSpy('loadRetryPolicies'),
      stopQueuePolling: jasmine.createSpy('stopQueuePolling'),
      reload: jasmine.createSpy('reload'),
    });
    cmp.switchTab('queue' as any);
    expect((cmp as any).tab.set).toHaveBeenCalledWith('queue');
    expect((cmp as any).startQueuePolling).toHaveBeenCalled();
    expect((cmp as any).loadJobs).toHaveBeenCalledWith(true);
    expect((cmp as any).loadRetryPolicies).toHaveBeenCalled();
  });

  it('stops polling and reloads review tab as draft', () => {
    const cmp = Object.create(
      DamAssetLibraryComponent.prototype,
    ) as DamAssetLibraryComponent;
    Object.assign(cmp as any, {
      tab: { set: jasmine.createSpy('tabSet') },
      retryPolicyRollbackPreview: { set: jasmine.createSpy('previewSet') },
      startQueuePolling: jasmine.createSpy('startQueuePolling'),
      stopQueuePolling: jasmine.createSpy('stopQueuePolling'),
      reload: jasmine.createSpy('reload'),
      statusFilter: '',
    });
    cmp.switchTab('review' as any);
    expect((cmp as any).stopQueuePolling).toHaveBeenCalled();
    expect((cmp as any).statusFilter).toBe('draft');
    expect((cmp as any).reload).toHaveBeenCalledWith(true);
  });
});
