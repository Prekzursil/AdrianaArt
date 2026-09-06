import { AdminComponent } from './admin.component';

/** Golden WU admin-pages-revision-title-key — pagesRevisionTitleKey. */
describe('AdminComponent pagesRevisionTitleKey (golden WU)', () => {
  function bare(key: string): AdminComponent {
    const cmp = Object.create(AdminComponent.prototype) as AdminComponent;
    Object.assign(cmp as any, { pagesRevisionKey: key });
    return cmp;
  }

  it('maps known page keys and returns undefined otherwise', () => {
    expect(bare('page.about').pagesRevisionTitleKey()).toBe('adminUi.site.pages.aboutLabel');
    expect(bare('page.contact').pagesRevisionTitleKey()).toBe('adminUi.site.pages.contactLabel');
    expect(bare('unknown').pagesRevisionTitleKey()).toBeUndefined();
    expect(bare('').pagesRevisionTitleKey()).toBeUndefined();
  });
});
