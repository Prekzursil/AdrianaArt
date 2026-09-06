import { AssetLibraryComponent } from './asset-library.component';

/** Golden WU asset-edit-preview-aspect — editPreviewAspectClass. */
describe('AssetLibraryComponent editPreviewAspectClass (golden WU)', () => {
  it('maps crop presets to aspect classes', () => {
    const cmp = Object.create(AssetLibraryComponent.prototype) as AssetLibraryComponent;
    (cmp as any).editCropPreset = 'square';
    expect(cmp.editPreviewAspectClass()).toBe('aspect-[1/1]');
    (cmp as any).editCropPreset = 'hero';
    expect(cmp.editPreviewAspectClass()).toBe('aspect-[16/7]');
    (cmp as any).editCropPreset = 'card';
    expect(cmp.editPreviewAspectClass()).toBe('aspect-[4/3]');
    (cmp as any).editCropPreset = 'mobile';
    expect(cmp.editPreviewAspectClass()).toBe('aspect-[9/16]');
    (cmp as any).editCropPreset = 'wide';
    expect(cmp.editPreviewAspectClass()).toBe('aspect-[16/9]');
  });
});
