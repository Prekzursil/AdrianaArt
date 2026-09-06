import { signal } from '@angular/core';
import { AdminProductsComponent } from './admin-products.component';

/** Golden WU products-density-toggle-label-key — densityToggleLabelKey. */
describe('AdminProductsComponent densityToggleLabelKey (golden WU)', () => {
  function bare(density: 'compact' | 'comfortable'): AdminProductsComponent {
    const cmp = Object.create(AdminProductsComponent.prototype) as AdminProductsComponent;
    Object.assign(cmp as any, { tableLayout: signal({ density }) });
    return cmp;
  }

  it('toggles between compact and comfortable label keys', () => {
    expect(bare('compact').densityToggleLabelKey()).toBe(
      'adminUi.tableLayout.densityToggle.toComfortable',
    );
    expect(bare('comfortable').densityToggleLabelKey()).toBe(
      'adminUi.tableLayout.densityToggle.toCompact',
    );
  });
});
