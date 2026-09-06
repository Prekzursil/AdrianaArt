import { ShopComponent } from './shop.component';

describe('ShopComponent isCreatingAnyCategory (golden WU)', () => {
  function make(parent: string | null) {
    const cmp = Object.create(ShopComponent.prototype) as ShopComponent;
    (cmp as any).creatingCategoryParentSlug = parent;
    return cmp;
  }
  it('is true when creatingCategoryParentSlug is non-null', () => {
    expect(make(null).isCreatingAnyCategory()).toBe(false);
    expect(make('root').isCreatingAnyCategory()).toBe(true);
    expect(make('').isCreatingAnyCategory()).toBe(true);
  });
});
