import { ShopComponent } from './shop.component';

describe('ShopComponent shouldKeepSubcategoryInCanonical (golden WU)', () => {
  it('requires matching parent/child relationship', () => {
    const cmp = Object.create(ShopComponent.prototype) as any;
    cmp.categoriesBySlug = new Map([
      ['mugs', { id: 'p', name: 'Mugs' }],
      ['small', { id: 'c', name: 'Small', parent_id: 'p' }],
      ['orphan', { id: 'o', name: 'Orphan', parent_id: 'other' }],
    ]);
    cmp.activeCategorySlug = 'sale';
    cmp.activeSubcategorySlug = 'small';
    expect(cmp.shouldKeepSubcategoryInCanonical()).toBe(false);
    cmp.activeCategorySlug = 'mugs';
    cmp.activeSubcategorySlug = '';
    expect(cmp.shouldKeepSubcategoryInCanonical()).toBe(false);
    cmp.activeSubcategorySlug = 'small';
    expect(cmp.shouldKeepSubcategoryInCanonical()).toBe(true);
    cmp.activeSubcategorySlug = 'orphan';
    expect(cmp.shouldKeepSubcategoryInCanonical()).toBe(false);
  });
});
