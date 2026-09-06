import { AssetLibraryComponent } from './asset-library.component';

/** Golden WU asset-library-close-image-editor — closeImageEditor. */
describe('AssetLibraryComponent closeImageEditor (golden WU)', () => {
  it('clears editImage unless saving', () => {
    const cmp = Object.create(AssetLibraryComponent.prototype) as AssetLibraryComponent;
    Object.assign(cmp as any, {
      editImage: { id: 'e1' },
      editSaving: () => true,
    });
    cmp.closeImageEditor();
    expect((cmp as any).editImage).toEqual({ id: 'e1' });
    Object.assign(cmp as any, { editSaving: () => false });
    cmp.closeImageEditor();
    expect((cmp as any).editImage).toBeNull();
  });
});
