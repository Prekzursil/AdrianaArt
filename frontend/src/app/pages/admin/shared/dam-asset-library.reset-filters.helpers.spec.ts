import { DamAssetLibraryComponent } from './dam-asset-library.component';

/** Golden WU dam-reset-filters -- resetFilters. */
describe('DamAssetLibraryComponent resetFilters (golden WU)', () => {
  it('clears filters and reloads for library tab', () => {
    const cmp = Object.create(
      DamAssetLibraryComponent.prototype,
    ) as DamAssetLibraryComponent;
    Object.assign(cmp as any, {
      q: 'x',
      tag: 't',
      assetType: 'image',
      statusFilter: 'published',
      visibility: 'public',
      sort: 'oldest',
      tab: jasmine.createSpy('tab').and.returnValue('library'),
      reload: jasmine.createSpy('reload'),
    });
    cmp.resetFilters();
    expect((cmp as any).q).toBe('');
    expect((cmp as any).tag).toBe('');
    expect((cmp as any).assetType).toBe('');
    expect((cmp as any).statusFilter).toBe('');
    expect((cmp as any).visibility).toBe('');
    expect((cmp as any).sort).toBe('newest');
    expect((cmp as any).reload).toHaveBeenCalledWith(true);
  });
});
