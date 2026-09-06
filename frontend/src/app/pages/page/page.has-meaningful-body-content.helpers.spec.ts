import { CmsPageComponent } from './page.component';

/** Golden WU page-has-meaningful-body-content — hasMeaningfulBodyContent. */
describe('CmsPageComponent hasMeaningfulBodyContent (golden WU)', () => {
  it('requires >=80 visible characters after stripping tags', () => {
    const cmp = Object.create(CmsPageComponent.prototype) as CmsPageComponent;
    (cmp as any).bodyHtml = () => '<p>short</p>';
    expect(cmp.hasMeaningfulBodyContent()).toBe(false);
    (cmp as any).bodyHtml = () => '<p>' + 'x'.repeat(80) + '</p>';
    expect(cmp.hasMeaningfulBodyContent()).toBe(true);
  });
});
