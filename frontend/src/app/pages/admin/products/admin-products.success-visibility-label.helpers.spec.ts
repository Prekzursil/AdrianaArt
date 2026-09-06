import { AdminProductsComponent } from './admin-products.component';

/** Golden WU products-success-visibility-label — successVisibilityLabelKey. */
describe('AdminProductsComponent successVisibilityLabelKey (golden WU)', () => {
  it('maps savedIsVisible to feedback keys', () => {
    const cmp = Object.create(AdminProductsComponent.prototype) as AdminProductsComponent;
    (cmp as any).savedIsVisible = () => true;
    expect(cmp.successVisibilityLabelKey()).toBe('adminUi.products.successFeedback.visible');
    (cmp as any).savedIsVisible = () => false;
    expect(cmp.successVisibilityLabelKey()).toBe('adminUi.products.successFeedback.hidden');
  });
});
