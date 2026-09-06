import { AdminComponent } from './admin.component';

/** Golden WU admin-cms-preview-width — preview size helpers. */
describe('AdminComponent cms preview width helpers (golden WU)', () => {
  function createCmp(device: string) {
    const cmp = Object.create(AdminComponent.prototype) as AdminComponent;
    (cmp as any).cmsPrefs = { previewDevice: () => device };
    return cmp;
  }

  it('cmsPreviewMaxWidthClass maps device to max-width utility', () => {
    expect(createCmp('mobile').cmsPreviewMaxWidthClass()).toBe('max-w-[390px]');
    expect(createCmp('tablet').cmsPreviewMaxWidthClass()).toBe('max-w-[768px]');
    expect(createCmp('desktop').cmsPreviewMaxWidthClass()).toBe('max-w-[1024px]');
    expect(createCmp('other').cmsPreviewMaxWidthClass()).toBe('max-w-[1024px]');
  });

  it('cmsPreviewViewportWidth maps device to pixel width', () => {
    expect(createCmp('mobile').cmsPreviewViewportWidth()).toBe(390);
    expect(createCmp('tablet').cmsPreviewViewportWidth()).toBe(768);
    expect(createCmp('desktop').cmsPreviewViewportWidth()).toBe(1024);
  });
});
