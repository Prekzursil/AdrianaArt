import { AdminProductsComponent } from './admin-products.component';

/** Golden WU admin-products-toggle-selected -- toggleSelected. */
describe('AdminProductsComponent toggleSelected (golden WU)', () => {
  it('returns early when view is deleted', () => {
    const cmp = Object.create(AdminProductsComponent.prototype) as AdminProductsComponent;
    Object.assign(cmp as any, {
      view: 'deleted',
      selected: new Set(),
      updateBulkPricePreview: jasmine.createSpy('preview'),
    });
    cmp.toggleSelected('p1', { target: { checked: true } } as any);
    expect((cmp as any).selected.size).toBe(0);
    expect((cmp as any).updateBulkPricePreview).not.toHaveBeenCalled();
  });
});
