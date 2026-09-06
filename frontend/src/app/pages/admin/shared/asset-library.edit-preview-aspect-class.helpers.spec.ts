import { AssetLibraryComponent } from './asset-library.component';

/** Golden WU asset-library-edit-preview-aspect-class — editPreviewAspectClass. */
describe('AssetLibraryComponent editPreviewAspectClass (golden WU)', () => {
  it('maps crop presets to aspect utility classes', () => {
    const cmp = Object.create(AssetLibraryComponent.prototype) as AssetLibraryComponent;
    Object.assign(cmp as any, { editCropPreset: 'square' });
    expect(cmp.editPreviewAspectClass()).toBe('aspect-[1/1]');
    Object.assign(cmp as any, { editCropPreset: 'hero' });
    expect(cmp.editPreviewAspectClass()).toBe('aspect-[16/7]');
    Object.assign(cmp as any, { editCropPreset: 'card' });
    expect(cmp.editPreviewAspectClass()).toBe('aspect-[4/3]');
    Object.assign(cmp as any, { editCropPreset: 'mobile' });
    expect(cmp.editPreviewAspectClass()).toBe('aspect-[9/16]');
    Object.assign(cmp as any, { editCropPreset: 'other' });
    expect(cmp.editPreviewAspectClass()).toBe('aspect-[16/9]');
  });
});
