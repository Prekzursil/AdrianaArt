import { AssetLibraryComponent } from './asset-library.component';

/** Golden WU asset-meta-total-pages — metaTotalPages. */
describe('AssetLibraryComponent metaTotalPages (golden WU)', () => {
  it('proxies totalPages()', () => {
    const cmp = Object.create(AssetLibraryComponent.prototype) as AssetLibraryComponent;
    (cmp as any).totalPages = () => 7;
    expect(cmp.metaTotalPages()).toBe(7);
  });
});
