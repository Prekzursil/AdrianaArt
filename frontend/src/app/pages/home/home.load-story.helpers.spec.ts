import { HomeComponent } from './home.component';

/** Golden WU home-load-story -- loadStory. */
describe('HomeComponent loadStory (golden WU)', () => {
  it('renders story markdown on success', () => {
    const cmp = Object.create(HomeComponent.prototype) as HomeComponent;
    const block = { body_markdown: 'hello' };
    Object.assign(cmp as any, {
      storyLoading: { set: jasmine.createSpy('loading') },
      storyBlock: { set: jasmine.createSpy('block') },
      storyHtml: { set: jasmine.createSpy('html') },
      translate: { currentLang: 'en' },
      markdown: { render: jasmine.createSpy('render').and.returnValue('<p>hello</p>') },
      api: {
        get: jasmine.createSpy('get').and.returnValue({
          subscribe: (h: any) => h.next(block),
        }),
      },
    });
    (cmp as any).loadStory();
    expect((cmp as any).api.get).toHaveBeenCalledWith('/content/home.story', { lang: 'en' });
    expect((cmp as any).storyBlock.set).toHaveBeenCalledWith(block);
    expect((cmp as any).storyHtml.set).toHaveBeenCalledWith('<p>hello</p>');
    expect((cmp as any).storyLoading.set).toHaveBeenCalledWith(false);
  });
});
