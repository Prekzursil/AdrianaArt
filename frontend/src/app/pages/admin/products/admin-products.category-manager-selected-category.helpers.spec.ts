import { AdminProductsComponent } from './admin-products.component';

/** Golden WU admin-products-category-manager-selected-category -- categoryManagerSelectedCategory. */
describe('AdminProductsComponent categoryManagerSelectedCategory (golden WU)', () => {
  it('returns null when category manager slug is empty', () => {
    const cmp = Object.create(AdminProductsComponent.prototype) as AdminProductsComponent;
    Object.assign(cmp as any, {
      categoryManagerSlug: '   ',
      categories: jasmine.createSpy('categories').and.returnValue([{ slug: 'a' }]),
    });
    expect(cmp.categoryManagerSelectedCategory()).toBeNull();
    expect((cmp as any).categories).not.toHaveBeenCalled();
  });
});
