import { signal } from '@angular/core';
import { DamAssetLibraryComponent } from './dam-asset-library.component';

/** Golden WU dam-queue-selection-helpers. */
describe('DamAssetLibraryComponent queue selection helpers (golden WU)', () => {
  function bare(): DamAssetLibraryComponent {
    const cmp = Object.create(DamAssetLibraryComponent.prototype) as DamAssetLibraryComponent;
    Object.assign(cmp as any, {
      selectedQueueJobIds: signal(new Set<string>()),
      activeJobEventsFor: signal('j1'),
      jobEvents: signal([{ id: 1 }]),
      jobEventsLoading: signal(true),
    });
    return cmp;
  }

  it('toggleQueueJobSelected adds/removes ids', () => {
    const cmp = bare();
    cmp.toggleQueueJobSelected('j1', { target: { checked: true } } as any);
    expect((cmp as any).selectedQueueJobIds().has('j1')).toBe(true);
    cmp.toggleQueueJobSelected('j1', { target: { checked: false } } as any);
    expect((cmp as any).selectedQueueJobIds().has('j1')).toBe(false);
  });

  it('closeJobEvents clears event panel state', () => {
    const cmp = bare();
    cmp.closeJobEvents();
    expect((cmp as any).activeJobEventsFor()).toBeNull();
    expect((cmp as any).jobEvents()).toEqual([]);
    expect((cmp as any).jobEventsLoading()).toBe(false);
  });
});
