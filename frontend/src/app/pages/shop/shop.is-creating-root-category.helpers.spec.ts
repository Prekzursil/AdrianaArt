import { ShopComponent } from './shop.component';

/** Golden WU shop-is-creating-root-category — isCreatingRootCategory. */
describe('ShopComponent isCreatingRootCategory (golden WU)', () => {
  it('is true only when creatingCategoryParentSlug is empty string', () => {
    const cmp = Object.create(ShopComponent.prototype) as ShopComponent;
    (cmp as any).creatingCategoryParentSlug = '';
    expect(cmp.isCreatingRootCategory()).toBe(true);
    (cmp as any).creatingCategoryParentSlug = 'parent';
    expect(cmp.isCreatingRootCategory()).toBe(false);
    (cmp as any).creatingCategoryParentSlug = null;
    expect(cmp.isCreatingRootCategory()).toBe(false);
  });
});
