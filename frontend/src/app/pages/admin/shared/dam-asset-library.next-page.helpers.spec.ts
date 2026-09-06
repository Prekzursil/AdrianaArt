import { DamAssetLibraryComponent } from './dam-asset-library.component';

/** Golden WU dam-next-page -- nextPage. */
describe('DamAssetLibraryComponent nextPage (golden WU)', () => {
  it('no-ops on last page', () => {
    const cmp = Object.create(
      DamAssetLibraryComponent.prototype,
    ) as DamAssetLibraryComponent;
    Object.assign(cmp as any, {
      page: 2,
      metaTotalPages: jasmine.createSpy('metaTotalPages').and.returnValue(2),
      reload: jasmine.createSpy('reload'),
    });
    cmp.nextPage();
    expect((cmp as any).reload).not.toHaveBeenCalled();
  });

  it('increments page and reloads', () => {
    const cmp = Object.create(
      DamAssetLibraryComponent.prototype,
    ) as DamAssetLibraryComponent;
    Object.assign(cmp as any, {
      page: 1,
      metaTotalPages: jasmine.createSpy('metaTotalPages').and.returnValue(3),
      reload: jasmine.createSpy('reload'),
    });
    cmp.nextPage();
    expect((cmp as any).page).toBe(2);
    expect((cmp as any).reload).toHaveBeenCalled();
  });
});
