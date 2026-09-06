import { ShopComponent } from './shop.component';

describe('ShopComponent cancelCreateCategory (golden WU)', () => {
  it('clears create-category draft fields', () => {
    const cmp = Object.create(ShopComponent.prototype) as any;
    cmp.creatingCategoryParentSlug = 'mugs';
    cmp.createSaving = true;
    cmp.createError = 'boom';
    cmp.createNameRo = 'Cană';
    cmp.createNameEn = 'Mug';
    cmp.cancelCreateCategory();
    expect(cmp.creatingCategoryParentSlug).toBeNull();
    expect(cmp.createSaving).toBe(false);
    expect(cmp.createError).toBe('');
    expect(cmp.createNameRo).toBe('');
    expect(cmp.createNameEn).toBe('');
  });
});
