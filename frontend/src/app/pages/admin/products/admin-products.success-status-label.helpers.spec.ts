import { AdminProductsComponent } from './admin-products.component';

/** Golden WU products-success-status-label — successStatusLabelKey. */
describe('AdminProductsComponent successStatusLabelKey (golden WU)', () => {
  it('builds status label key from savedStatus', () => {
    const cmp = Object.create(AdminProductsComponent.prototype) as AdminProductsComponent;
    (cmp as any).savedStatus = () => 'published';
    expect(cmp.successStatusLabelKey()).toBe('adminUi.status.published');
  });
});
