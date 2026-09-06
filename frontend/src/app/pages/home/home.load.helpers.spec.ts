import { HomeComponent } from './home.component';

/** Golden WU home-load -- load. */
describe('HomeComponent load (golden WU)', () => {
  it('resets story state and loads layout', () => {
    const cmp = Object.create(HomeComponent.prototype) as HomeComponent;
    Object.assign(cmp as any, {
      setMetaTags: jasmine.createSpy('setMetaTags'),
      recentlyViewedService: { list: jasmine.createSpy('list').and.returnValue([1, 2, 3, 4, 5, 6, 7]) },
      storyBlock: { set: jasmine.createSpy('storyBlock') },
      storyHtml: { set: jasmine.createSpy('storyHtml') },
      storyLoading: { set: jasmine.createSpy('storyLoading') },
      loadLayout: jasmine.createSpy('loadLayout'),
    });
    (cmp as any).load();
    expect((cmp as any).setMetaTags).toHaveBeenCalled();
    expect((cmp as any).recentlyViewed).toEqual([1, 2, 3, 4, 5, 6]);
    expect((cmp as any).storyBlock.set).toHaveBeenCalledWith(null);
    expect((cmp as any).storyHtml.set).toHaveBeenCalledWith('');
    expect((cmp as any).storyLoading.set).toHaveBeenCalledWith(true);
    expect((cmp as any).loadLayout).toHaveBeenCalled();
  });
});
