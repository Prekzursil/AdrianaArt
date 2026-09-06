import { CmsPageComponent } from './page.component';

/** Golden WU page-login-next-url — loginNextUrl. */
describe('CmsPageComponent loginNextUrl (golden WU)', () => {
  it('returns the current router url in the browser', () => {
    const cmp = Object.create(CmsPageComponent.prototype) as CmsPageComponent;
    Object.assign(cmp as any, {
      slug: 'terms',
      router: { url: '/pages/terms?lang=en' },
    });
    expect(cmp.loginNextUrl()).toBe('/pages/terms?lang=en');
  });
});
