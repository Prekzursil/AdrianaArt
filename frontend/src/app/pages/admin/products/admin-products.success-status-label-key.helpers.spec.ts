import { signal } from '@angular/core';
import { AdminProductsComponent } from './admin-products.component';

/** Golden WU products-success-status-label-key — successStatusLabelKey. */
describe('AdminProductsComponent successStatusLabelKey (golden WU)', () => {
  function bare(status: string): AdminProductsComponent {
    const cmp = Object.create(AdminProductsComponent.prototype) as AdminProductsComponent;
    Object.assign(cmp as any, { savedStatus: signal(status) });
    return cmp;
  }

  it('embeds savedStatus into adminUi.status key', () => {
    expect(bare('draft').successStatusLabelKey()).toBe('adminUi.status.draft');
    expect(bare('published').successStatusLabelKey()).toBe('adminUi.status.published');
  });
});
