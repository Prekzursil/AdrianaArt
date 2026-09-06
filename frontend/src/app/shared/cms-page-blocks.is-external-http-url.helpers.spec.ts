import { CmsPageBlocksComponent } from './cms-page-blocks.component';

/** Golden WU cms-page-blocks-is-external-http-url — isExternalHttpUrl. */
describe('CmsPageBlocksComponent isExternalHttpUrl (golden WU)', () => {
  it('detects http(s) URLs only', () => {
    const cmp = Object.create(CmsPageBlocksComponent.prototype) as CmsPageBlocksComponent;
    expect(cmp.isExternalHttpUrl(null)).toBe(false);
    expect(cmp.isExternalHttpUrl('/relative')).toBe(false);
    expect(cmp.isExternalHttpUrl(' https://x.test ')).toBe(true);
    expect(cmp.isExternalHttpUrl('HTTP://x.test')).toBe(true);
  });
});
