import { AssetLibraryComponent } from './asset-library.component';

/** Golden WU asset-library-meta-total-pages — metaTotalPages. */
describe('AssetLibraryComponent metaTotalPages (golden WU)', () => {
  it('delegates to totalPages signal', () => {
    const cmp = Object.create(AssetLibraryComponent.prototype) as AssetLibraryComponent;
    Object.assign(cmp as any, { totalPages: () => 7 });
    expect(cmp.metaTotalPages()).toBe(7);
  });
});
