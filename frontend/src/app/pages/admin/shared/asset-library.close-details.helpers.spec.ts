import { AssetLibraryComponent } from './asset-library.component';

/** Golden WU asset-library-close-details — closeDetails. */
describe('AssetLibraryComponent closeDetails (golden WU)', () => {
  it('clears detailsImage', () => {
    const cmp = Object.create(AssetLibraryComponent.prototype) as AssetLibraryComponent;
    Object.assign(cmp as any, { detailsImage: { id: 'a1' } });
    cmp.closeDetails();
    expect((cmp as any).detailsImage).toBeNull();
  });
});
