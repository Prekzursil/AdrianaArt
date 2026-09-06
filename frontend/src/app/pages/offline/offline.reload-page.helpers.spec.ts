import { OfflineComponent } from './offline.component';

/** Golden WU offline-reload-page -- reloadPage. */
describe('OfflineComponent reloadPage (golden WU)', () => {
  it('calls location.reload', () => {
    const cmp = Object.create(OfflineComponent.prototype) as OfflineComponent;
    const reload = jasmine.createSpy('reload');
    const original = (globalThis as any).location;
    try {
      (globalThis as any).location = { reload };
      cmp.reloadPage();
      expect(reload).toHaveBeenCalled();
    } finally {
      (globalThis as any).location = original;
    }
  });
});
