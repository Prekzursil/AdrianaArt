import { AdminComponent } from './admin.component';

/** Golden WU — cmsPreviewViewportWidth by preview device. */
describe('AdminComponent cmsPreviewViewportWidth (golden WU)', () => {
  function bare(device: string): AdminComponent {
    const cmp = Object.create(AdminComponent.prototype) as AdminComponent;
    (cmp as any).cmsPrefs = { previewDevice: () => device };
    return cmp;
  }

  it('maps device to viewport width', () => {
    expect(bare('mobile').cmsPreviewViewportWidth()).toBe(390);
    expect(bare('tablet').cmsPreviewViewportWidth()).toBe(768);
    expect(bare('desktop').cmsPreviewViewportWidth()).toBe(1024);
  });
});
