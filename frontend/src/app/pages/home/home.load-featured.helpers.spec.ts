import { HomeComponent } from './home.component';

/** Golden WU home-load-featured -- loadFeatured. */
describe('HomeComponent loadFeatured (golden WU)', () => {
  it('sets featured items on success', () => {
    const cmp = Object.create(HomeComponent.prototype) as HomeComponent;
    Object.assign(cmp as any, {
      featuredLoading: { set: jasmine.createSpy('loading') },
      featuredError: { set: jasmine.createSpy('error') },
      translate: { currentLang: 'en' },
      catalog: {
        listProducts: jasmine.createSpy('listProducts').and.returnValue({
          subscribe: (h: any) => h.next({ items: [{ id: 'p1' }] }),
        }),
      },
    });
    cmp.loadFeatured();
    expect((cmp as any).featured).toEqual([{ id: 'p1' }]);
    expect((cmp as any).featuredLoading.set).toHaveBeenCalledWith(false);
  });
});
