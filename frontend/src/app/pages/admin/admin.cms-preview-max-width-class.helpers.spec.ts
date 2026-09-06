import { AdminComponent } from './admin.component';

/** Golden WU — cmsPreviewMaxWidthClass by preview device. */
describe('AdminComponent cmsPreviewMaxWidthClass (golden WU)', () => {
  function bare(device: string): AdminComponent {
    const cmp = Object.create(AdminComponent.prototype) as AdminComponent;
    (cmp as any).cmsPrefs = { previewDevice: () => device };
    return cmp;
  }

  it('maps device to max-width class', () => {
    expect(bare('mobile').cmsPreviewMaxWidthClass()).toBe('max-w-[390px]');
    expect(bare('tablet').cmsPreviewMaxWidthClass()).toBe('max-w-[768px]');
    expect(bare('desktop').cmsPreviewMaxWidthClass()).toBe('max-w-[1024px]');
  });
});
