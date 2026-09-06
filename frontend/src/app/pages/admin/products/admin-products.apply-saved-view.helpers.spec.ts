import { AdminProductsComponent } from './admin-products.component';

/** Golden WU admin-products-apply-saved-view -- applySavedView. */
describe('AdminProductsComponent applySavedView (golden WU)', () => {
  it('returns early when key is empty', () => {
    const cmp = Object.create(AdminProductsComponent.prototype) as AdminProductsComponent;
    Object.assign(cmp as any, {
      selectedSavedViewKey: 'x',
      savedViews: jasmine.createSpy('savedViews'),
      load: jasmine.createSpy('load'),
    });
    cmp.applySavedView('');
    expect((cmp as any).selectedSavedViewKey).toBe('');
    expect((cmp as any).savedViews).not.toHaveBeenCalled();
    expect((cmp as any).load).not.toHaveBeenCalled();
  });
});
