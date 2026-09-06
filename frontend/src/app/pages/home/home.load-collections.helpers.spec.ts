import { HomeComponent } from './home.component';

/** Golden WU home-load-collections -- loadCollections. */
describe('HomeComponent loadCollections (golden WU)', () => {
  it('loads featured collections on success', () => {
    const cmp = Object.create(HomeComponent.prototype) as HomeComponent;
    const cols = [{ id: 'c1' }];
    Object.assign(cmp as any, {
      collectionsLoading: { set: jasmine.createSpy('loading') },
      collectionsError: { set: jasmine.createSpy('error') },
      translate: { currentLang: 'en' },
      catalog: {
        listFeaturedCollections: jasmine.createSpy('list').and.returnValue({
          subscribe: (h: any) => h.next(cols),
        }),
      },
    });
    cmp.loadCollections();
    expect((cmp as any).collectionsLoading.set).toHaveBeenCalledWith(true);
    expect((cmp as any).featuredCollections).toBe(cols);
    expect((cmp as any).collectionsLoading.set).toHaveBeenCalledWith(false);
  });
});
