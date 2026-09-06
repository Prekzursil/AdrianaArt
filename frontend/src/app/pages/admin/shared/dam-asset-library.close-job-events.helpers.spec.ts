import { DamAssetLibraryComponent } from './dam-asset-library.component';

/** Golden WU dam-close-job-events -- closeJobEvents. */
describe('DamAssetLibraryComponent closeJobEvents (golden WU)', () => {
  it('clears active job events panel state', () => {
    const cmp = Object.create(DamAssetLibraryComponent.prototype) as DamAssetLibraryComponent;
    Object.assign(cmp as any, {
      activeJobEventsFor: { set: jasmine.createSpy('for') },
      jobEvents: { set: jasmine.createSpy('events') },
      jobEventsLoading: { set: jasmine.createSpy('loading') },
    });
    cmp.closeJobEvents();
    expect((cmp as any).activeJobEventsFor.set).toHaveBeenCalledWith(null);
    expect((cmp as any).jobEvents.set).toHaveBeenCalledWith([]);
    expect((cmp as any).jobEventsLoading.set).toHaveBeenCalledWith(false);
  });
});
