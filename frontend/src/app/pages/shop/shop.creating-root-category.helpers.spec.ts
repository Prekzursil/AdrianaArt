import { ShopComponent } from './shop.component';

/** Golden WU shop-creating-root-category — create-mode guards. */
describe('ShopComponent creating category guards (golden WU)', () => {
  function createCmp(parentSlug: string) {
    const cmp = Object.create(ShopComponent.prototype) as ShopComponent;
    (cmp as any).creatingCategoryParentSlug = parentSlug;
    return cmp;
  }

  it('isCreatingRootCategory when parent slug is empty', () => {
    expect(createCmp('').isCreatingRootCategory()).toBe(true);
    expect(createCmp('shoes').isCreatingRootCategory()).toBe(false);
  });

  it('isCreatingSubcategory matches the active parent slug', () => {
    expect(createCmp('shoes').isCreatingSubcategory('shoes')).toBe(true);
    expect(createCmp('shoes').isCreatingSubcategory('hats')).toBe(false);
    expect(createCmp('').isCreatingSubcategory('')).toBe(true);
  });
});
