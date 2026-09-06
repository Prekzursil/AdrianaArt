import { ShopComponent } from './shop.component';

/** Golden WU shop-can-reorder-products — canReorderProducts. */
describe('ShopComponent canReorderProducts (golden WU)', () => {
  function base(cmp: any) {
    cmp.canEditProducts = () => true;
    cmp.bulkSelectMode = () => false;
    cmp.productReorderSaving = () => false;
    cmp.loading = () => false;
    cmp.hasError = () => false;
    cmp.filters = { sort: 'recommended' };
    cmp.activeLeafCategorySlug = () => 'shoes';
    cmp.paginationMode = 'pages';
    cmp.pageMeta = { total_pages: 1, page: 1, total_items: 3 };
    cmp.products = [{ id: '1' }, { id: '2' }];
  }

  it('requires edit+recommended+leaf+fully loaded+>1 products', () => {
    const cmp = Object.create(ShopComponent.prototype) as ShopComponent;
    base(cmp as any);
    expect(cmp.canReorderProducts()).toBe(true);
    (cmp as any).canEditProducts = () => false;
    expect(cmp.canReorderProducts()).toBe(false);
    base(cmp as any);
    (cmp as any).filters = { sort: 'price_asc' };
    expect(cmp.canReorderProducts()).toBe(false);
    base(cmp as any);
    (cmp as any).pageMeta = { total_pages: 2, page: 1, total_items: 20 };
    expect(cmp.canReorderProducts()).toBe(false);
    base(cmp as any);
    (cmp as any).products = [{ id: '1' }];
    expect(cmp.canReorderProducts()).toBe(false);
  });
});
