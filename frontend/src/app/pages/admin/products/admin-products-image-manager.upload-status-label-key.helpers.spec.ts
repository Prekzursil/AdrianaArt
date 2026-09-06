import { AdminProductsImageManagerComponent } from './admin-products-image-manager.component';

/** Golden WU products-upload-status-label-key — uploadStatusLabelKey. */
describe('AdminProductsImageManagerComponent uploadStatusLabelKey (golden WU)', () => {
  function bare(): AdminProductsImageManagerComponent {
    return Object.create(
      AdminProductsImageManagerComponent.prototype,
    ) as AdminProductsImageManagerComponent;
  }

  it('maps upload statuses and defaults unknown to queued', () => {
    const cmp = bare();
    expect(cmp.uploadStatusLabelKey('queued')).toBe('adminUi.products.form.uploadStatus.queued');
    expect(cmp.uploadStatusLabelKey('uploading')).toBe(
      'adminUi.products.form.uploadStatus.uploading',
    );
    expect(cmp.uploadStatusLabelKey('success')).toBe('adminUi.products.form.uploadStatus.success');
    expect(cmp.uploadStatusLabelKey('error')).toBe('adminUi.products.form.uploadStatus.error');
    expect(cmp.uploadStatusLabelKey('nope' as any)).toBe(
      'adminUi.products.form.uploadStatus.queued',
    );
  });
});
