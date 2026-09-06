import { AdminProductsComponent } from './admin-products.component';

/** Golden WU products-saved-is-visible — savedIsVisible. */
describe('AdminProductsComponent savedIsVisible (golden WU)', () => {
  it('requires published + active from snapshot or form', () => {
    const cmp = Object.create(AdminProductsComponent.prototype) as AdminProductsComponent;
    (cmp as any).lastSavedState = () => ({ status: 'published', isActive: true });
    (cmp as any).form = { status: 'draft', is_active: false };
    expect(cmp.savedIsVisible()).toBe(true);
    (cmp as any).lastSavedState = () => null;
    (cmp as any).form = { status: 'published', is_active: true };
    expect(cmp.savedIsVisible()).toBe(true);
    (cmp as any).form = { status: 'published', is_active: false };
    expect(cmp.savedIsVisible()).toBe(false);
    (cmp as any).form = { status: 'draft', is_active: true };
    expect(cmp.savedIsVisible()).toBe(false);
  });
});
