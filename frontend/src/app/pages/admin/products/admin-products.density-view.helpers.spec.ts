import { signal } from '@angular/core';
import { AdminProductsComponent } from './admin-products.component';

/** Golden WU products-density-view-helpers. */
describe('AdminProductsComponent density/search helpers (golden WU)', () => {
  function bare(): AdminProductsComponent {
    const cmp = Object.create(AdminProductsComponent.prototype) as AdminProductsComponent;
    Object.assign(cmp as any, {
      tableLayout: signal({ density: 'compact' }),
      applyTableLayout: jasmine.createSpy('apply'),
      productSearchActiveIndex: signal(0),
      productSearchResults: signal([{ id: 'p1' }, { id: 'p2' }]),
    });
    return cmp;
  }

  it('toggleDensity / densityToggleLabelKey', () => {
    const cmp = bare();
    cmp.toggleDensity();
    expect((cmp as any).applyTableLayout).toHaveBeenCalledWith(
      jasmine.objectContaining({ density: 'comfortable' }),
    );
    expect(cmp.densityToggleLabelKey()).toContain('toComfortable');
  });

  it('getProductSearchActive bounds index', () => {
    const fn = (AdminProductsComponent.prototype as any).getProductSearchActive.bind(bare());
    expect(fn()?.id).toBe('p1');
    const cmp = bare();
    (cmp as any).productSearchActiveIndex.set(-1);
    expect((AdminProductsComponent.prototype as any).getProductSearchActive.call(cmp)).toBeNull();
  });
});
