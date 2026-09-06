import { ShopComponent } from './shop.component';

describe('ShopComponent resolveActiveCategoryLabel (golden WU)', () => {
  it('uses sale i18n, category name, or slug title-case fallback', () => {
    const cmp = Object.create(ShopComponent.prototype) as any;
    cmp.translate = { instant: (k: string) => `T:${k}` };
    cmp.categoriesBySlug = new Map([['mugs', { id: '1', name: 'Mugs' }]]);
    cmp.activeCategorySlug = '';
    expect(cmp.resolveActiveCategoryLabel()).toBeNull();
    cmp.activeCategorySlug = 'sale';
    expect(cmp.resolveActiveCategoryLabel()).toBe('T:shop.sale');
    cmp.activeCategorySlug = 'mugs';
    expect(cmp.resolveActiveCategoryLabel()).toBe('Mugs');
    cmp.activeCategorySlug = 'hand_made-bowls';
    expect(cmp.resolveActiveCategoryLabel()).toBe('Hand Made Bowls');
  });
});
