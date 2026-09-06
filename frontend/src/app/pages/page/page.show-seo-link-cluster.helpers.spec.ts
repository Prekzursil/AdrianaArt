import { CmsPageComponent } from './page.component';

/** Golden WU page-show-seo-link-cluster — showSeoLinkCluster. */
describe('CmsPageComponent showSeoLinkCluster (golden WU)', () => {
  it('hides when login required or legal index docs exist', () => {
    const cmp = Object.create(CmsPageComponent.prototype) as CmsPageComponent;
    Object.assign(cmp as any, {
      requiresLogin: () => true,
      legalIndexDocs: () => [],
    });
    expect(cmp.showSeoLinkCluster()).toBe(false);
    Object.assign(cmp as any, {
      requiresLogin: () => false,
      legalIndexDocs: () => [{ slug: 'privacy' }],
    });
    expect(cmp.showSeoLinkCluster()).toBe(false);
    Object.assign(cmp as any, {
      requiresLogin: () => false,
      legalIndexDocs: () => [],
    });
    expect(cmp.showSeoLinkCluster()).toBe(true);
  });
});
