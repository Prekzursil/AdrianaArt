import { signal } from '@angular/core';
import { AdminProductsComponent } from './admin-products.component';

/** Golden WU products-success-visibility-label-key — successVisibilityLabelKey. */
describe('AdminProductsComponent successVisibilityLabelKey (golden WU)', () => {
  function bare(visible: boolean): AdminProductsComponent {
    const cmp = Object.create(AdminProductsComponent.prototype) as AdminProductsComponent;
    Object.assign(cmp as any, { savedIsVisible: signal(visible) });
    return cmp;
  }

  it('maps visibility to successFeedback keys', () => {
    expect(bare(true).successVisibilityLabelKey()).toBe(
      'adminUi.products.successFeedback.visible',
    );
    expect(bare(false).successVisibilityLabelKey()).toBe(
      'adminUi.products.successFeedback.hidden',
    );
  });
});
