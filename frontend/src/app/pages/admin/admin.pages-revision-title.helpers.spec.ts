import { AdminComponent } from './admin.component';

/** Golden WU admin-pages-revision-title — pagesRevisionTitleKey. */
describe('AdminComponent pagesRevisionTitleKey (golden WU)', () => {
  it('maps known page revision keys and returns undefined otherwise', () => {
    const cmp = Object.create(AdminComponent.prototype) as AdminComponent;
    (cmp as any).pagesRevisionKey = 'page.about';
    expect(cmp.pagesRevisionTitleKey()).toBe('adminUi.site.pages.aboutLabel');
    (cmp as any).pagesRevisionKey = 'page.contact';
    expect(cmp.pagesRevisionTitleKey()).toBe('adminUi.site.pages.contactLabel');
    (cmp as any).pagesRevisionKey = 'page.terms';
    expect(cmp.pagesRevisionTitleKey()).toBe('adminUi.site.pages.legal.documents.termsIndex');
    (cmp as any).pagesRevisionKey = 'page.terms-and-conditions';
    expect(cmp.pagesRevisionTitleKey()).toBe('adminUi.site.pages.legal.documents.terms');
    (cmp as any).pagesRevisionKey = 'page.privacy-policy';
    expect(cmp.pagesRevisionTitleKey()).toBe('adminUi.site.pages.legal.documents.privacy');
    (cmp as any).pagesRevisionKey = 'page.anpc';
    expect(cmp.pagesRevisionTitleKey()).toBe('adminUi.site.pages.legal.documents.anpc');
    (cmp as any).pagesRevisionKey = 'page.unknown';
    expect(cmp.pagesRevisionTitleKey()).toBeUndefined();
    (cmp as any).pagesRevisionKey = '  ';
    expect(cmp.pagesRevisionTitleKey()).toBeUndefined();
  });
});
