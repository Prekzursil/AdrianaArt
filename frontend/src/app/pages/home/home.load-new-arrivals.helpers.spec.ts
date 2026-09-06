import { HomeComponent } from './home.component';

/** Golden WU home-load-new-arrivals -- loadNewArrivals. */
describe('HomeComponent loadNewArrivals (golden WU)', () => {
  it('sets newArrivals on success', () => {
    const cmp = Object.create(HomeComponent.prototype) as HomeComponent;
    Object.assign(cmp as any, {
      newArrivalsLoading: { set: jasmine.createSpy('loading') },
      newArrivalsError: { set: jasmine.createSpy('error') },
      translate: { currentLang: 'ro' },
      catalog: {
        listProducts: jasmine.createSpy('listProducts').and.returnValue({
          subscribe: (h: any) => h.next({ items: [{ id: 'n1' }] }),
        }),
      },
    });
    cmp.loadNewArrivals();
    expect((cmp as any).catalog.listProducts).toHaveBeenCalledWith(
      jasmine.objectContaining({ lang: 'ro', sort: 'newest', limit: 6 }),
    );
    expect((cmp as any).newArrivals).toEqual([{ id: 'n1' }]);
  });
});
