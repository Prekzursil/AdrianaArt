import { DamAssetLibraryComponent } from './dam-asset-library.component';

/** Golden WU dam-prev-page -- prevPage. */
describe('DamAssetLibraryComponent prevPage (golden WU)', () => {
  it('no-ops on first page', () => {
    const cmp = Object.create(
      DamAssetLibraryComponent.prototype,
    ) as DamAssetLibraryComponent;
    Object.assign(cmp as any, { page: 1, reload: jasmine.createSpy('reload') });
    cmp.prevPage();
    expect((cmp as any).reload).not.toHaveBeenCalled();
  });

  it('decrements page and reloads', () => {
    const cmp = Object.create(
      DamAssetLibraryComponent.prototype,
    ) as DamAssetLibraryComponent;
    Object.assign(cmp as any, { page: 3, reload: jasmine.createSpy('reload') });
    cmp.prevPage();
    expect((cmp as any).page).toBe(2);
    expect((cmp as any).reload).toHaveBeenCalled();
  });
});
