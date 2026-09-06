import { AssetLibraryComponent } from './asset-library.component';

/** Golden WU asset-library-close-focal-editor — closeFocalEditor. */
describe('AssetLibraryComponent closeFocalEditor (golden WU)', () => {
  it('clears focalImage unless saving', () => {
    const cmp = Object.create(AssetLibraryComponent.prototype) as AssetLibraryComponent;
    Object.assign(cmp as any, {
      focalImage: { id: 'f1' },
      focalSaving: () => true,
    });
    cmp.closeFocalEditor();
    expect((cmp as any).focalImage).toEqual({ id: 'f1' });
    Object.assign(cmp as any, { focalSaving: () => false });
    cmp.closeFocalEditor();
    expect((cmp as any).focalImage).toBeNull();
  });
});
