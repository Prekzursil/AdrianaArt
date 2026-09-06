import { DamAssetLibraryComponent } from './dam-asset-library.component';

/** Golden WU dam-reload -- reload. */
describe('DamAssetLibraryComponent reload (golden WU)', () => {
  it('resets page and loads media assets', () => {
    const cmp = Object.create(
      DamAssetLibraryComponent.prototype,
    ) as DamAssetLibraryComponent;
    const items = [{ id: 'a1' }];
    const meta = { total_items: 1, total_pages: 1, page: 1, limit: 24 };
    Object.assign(cmp as any, {
      page: 3,
      q: '',
      tag: '',
      assetType: '',
      statusFilter: '',
      visibility: '',
      sort: 'newest',
      tab: jasmine.createSpy('tab').and.returnValue('library'),
      loading: { set: jasmine.createSpy('loadingSet') },
      error: { set: jasmine.createSpy('errorSet') },
      errorRequestId: { set: jasmine.createSpy('errorRequestIdSet') },
      assets: { set: jasmine.createSpy('assetsSet') },
      meta: { set: jasmine.createSpy('metaSet') },
      loadTelemetry: jasmine.createSpy('loadTelemetry'),
      admin: {
        listMediaAssets: jasmine.createSpy('listMediaAssets').and.returnValue({
          subscribe: (h: any) => h.next({ items, meta }),
        }),
      },
    });
    cmp.reload(true);
    expect((cmp as any).page).toBe(1);
    expect((cmp as any).loading.set).toHaveBeenCalledWith(true);
    expect((cmp as any).assets.set).toHaveBeenCalledWith(items);
    expect((cmp as any).meta.set).toHaveBeenCalledWith(meta);
    expect((cmp as any).loading.set).toHaveBeenCalledWith(false);
    expect((cmp as any).loadTelemetry).toHaveBeenCalled();
  });
});
