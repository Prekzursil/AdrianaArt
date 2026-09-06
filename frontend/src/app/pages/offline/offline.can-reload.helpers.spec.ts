import { OfflineComponent } from './offline.component';
import * as offlineHelpers from './offline.helpers';

/** Golden WU offline-can-reload-helpers. */
describe('OfflineComponent canReloadNow (golden WU)', () => {
  afterEach(() => {
    (offlineHelpers.detectBrowserOnline as any).and?.stub?.();
  });

  it('canReloadNow mirrors online detection', () => {
    const cmp = Object.create(OfflineComponent.prototype) as OfflineComponent;
    spyOn(offlineHelpers, 'detectBrowserOnline').and.returnValue(true);
    expect(cmp.canReloadNow()).toBe(true);
    (offlineHelpers.detectBrowserOnline as jasmine.Spy).and.returnValue(false);
    expect(cmp.canReloadNow()).toBe(false);
  });
});
