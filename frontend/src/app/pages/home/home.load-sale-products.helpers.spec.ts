import { HomeComponent } from './home.component';

/** Golden WU home-load-sale-products -- loadSaleProducts. */
describe('HomeComponent loadSaleProducts (golden WU)', () => {
  it('sets saleProducts on success', () => {
    const cmp = Object.create(HomeComponent.prototype) as HomeComponent;
    Object.assign(cmp as any, {
      saleLoading: { set: jasmine.createSpy('loading') },
      saleError: { set: jasmine.createSpy('error') },
      translate: { currentLang: 'en' },
      catalog: {
        listProducts: jasmine.createSpy('listProducts').and.returnValue({
          subscribe: (h: any) => h.next({ items: [{ id: 's1' }] }),
        }),
      },
    });
    cmp.loadSaleProducts();
    expect((cmp as any).catalog.listProducts).toHaveBeenCalledWith(
      jasmine.objectContaining({ on_sale: true, limit: 6 }),
    );
    expect((cmp as any).saleProducts).toEqual([{ id: 's1' }]);
  });
});
