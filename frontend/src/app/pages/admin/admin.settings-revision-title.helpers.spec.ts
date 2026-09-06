import { AdminComponent } from './admin.component';

/** Golden WU admin-settings-revision-title — settingsRevisionTitleKey. */
describe('AdminComponent settingsRevisionTitleKey (golden WU)', () => {
  it('maps seo prefix and known site revision keys', () => {
    const cmp = Object.create(AdminComponent.prototype) as AdminComponent;
    (cmp as any).settingsRevisionKey = 'seo.home';
    expect(cmp.settingsRevisionTitleKey()).toBe('adminUi.site.seo.title');
    (cmp as any).settingsRevisionKey = 'site.assets';
    expect(cmp.settingsRevisionTitleKey()).toBe('adminUi.site.assets.title');
    (cmp as any).settingsRevisionKey = 'site.social';
    expect(cmp.settingsRevisionTitleKey()).toBe('adminUi.site.social.title');
    (cmp as any).settingsRevisionKey = 'site.company';
    expect(cmp.settingsRevisionTitleKey()).toBe('adminUi.site.company.title');
    (cmp as any).settingsRevisionKey = 'site.navigation';
    expect(cmp.settingsRevisionTitleKey()).toBe('adminUi.site.navigation.title');
    (cmp as any).settingsRevisionKey = 'site.checkout';
    expect(cmp.settingsRevisionTitleKey()).toBe('adminUi.site.checkout.title');
    (cmp as any).settingsRevisionKey = 'site.reports';
    expect(cmp.settingsRevisionTitleKey()).toBe('adminUi.reports.title');
    (cmp as any).settingsRevisionKey = 'site.other';
    expect(cmp.settingsRevisionTitleKey()).toBe('adminUi.content.revisions.title');
  });
});
