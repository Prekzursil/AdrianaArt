import { ShopComponent } from './shop.component';

describe('ShopComponent creating-category flags (golden WU)', () => {
  function createCmp(): ShopComponent {
    const cmp = Object.create(ShopComponent.prototype) as ShopComponent;
    (cmp as any).creatingCategoryParentSlug = null;
    return cmp;
  }

  it('isCreatingAnyCategory is true when parent slug is non-null', () => {
    const cmp = createCmp();
    expect(cmp.isCreatingAnyCategory()).toBe(false);
    (cmp as any).creatingCategoryParentSlug = '';
    expect(cmp.isCreatingAnyCategory()).toBe(true);
    (cmp as any).creatingCategoryParentSlug = 'prints';
    expect(cmp.isCreatingAnyCategory()).toBe(true);
  });

  it('isCreatingRootCategory is true only for empty-string parent slug', () => {
    const cmp = createCmp();
    expect(cmp.isCreatingRootCategory()).toBe(false);
    (cmp as any).creatingCategoryParentSlug = '';
    expect(cmp.isCreatingRootCategory()).toBe(true);
    (cmp as any).creatingCategoryParentSlug = 'prints';
    expect(cmp.isCreatingRootCategory()).toBe(false);
  });

  it('isCreatingSubcategory matches the active parent slug exactly', () => {
    const cmp = createCmp();
    (cmp as any).creatingCategoryParentSlug = 'prints';
    expect(cmp.isCreatingSubcategory('prints')).toBe(true);
    expect(cmp.isCreatingSubcategory('kids')).toBe(false);
    (cmp as any).creatingCategoryParentSlug = '';
    expect(cmp.isCreatingSubcategory('')).toBe(true);
    expect(cmp.isCreatingSubcategory('prints')).toBe(false);
  });
});
