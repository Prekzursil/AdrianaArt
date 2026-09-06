import { ShopComponent } from './shop.component';

describe('ShopComponent isCreatingSubcategory (golden WU)', () => {
  it('is true only when creatingCategoryParentSlug matches', () => {
    const cmp = Object.create(ShopComponent.prototype) as any;
    cmp.creatingCategoryParentSlug = 'mugs';
    expect(cmp.isCreatingSubcategory('mugs')).toBe(true);
    expect(cmp.isCreatingSubcategory('bowls')).toBe(false);
    cmp.creatingCategoryParentSlug = null;
    expect(cmp.isCreatingSubcategory('mugs')).toBe(false);
  });
});
