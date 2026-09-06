import { OfflineComponent } from './offline.component';

/** Golden WU offline-on-retry -- onRetry. */
describe('OfflineComponent onRetry (golden WU)', () => {
  it('reloads when canReloadNow is true', () => {
    const cmp = Object.create(OfflineComponent.prototype) as OfflineComponent;
    Object.assign(cmp as any, {
      canReloadNow: jasmine.createSpy('canReloadNow').and.returnValue(true),
      reloadPage: jasmine.createSpy('reloadPage'),
    });
    cmp.onRetry();
    expect((cmp as any).reloadPage).toHaveBeenCalled();
  });

  it('no-ops when canReloadNow is false', () => {
    const cmp = Object.create(OfflineComponent.prototype) as OfflineComponent;
    Object.assign(cmp as any, {
      canReloadNow: jasmine.createSpy('canReloadNow').and.returnValue(false),
      reloadPage: jasmine.createSpy('reloadPage'),
    });
    cmp.onRetry();
    expect((cmp as any).reloadPage).not.toHaveBeenCalled();
  });
});
