import { AdminComponent } from './admin.component';

/** Golden WU admin-settings-revision-title-key — settingsRevisionTitleKey. */
describe('AdminComponent settingsRevisionTitleKey (golden WU)', () => {
  function bare(key: string): AdminComponent {
    const cmp = Object.create(AdminComponent.prototype) as AdminComponent;
    Object.assign(cmp as any, { settingsRevisionKey: key });
    return cmp;
  }

  it('maps settings keys and seo.* prefix', () => {
    expect(bare('seo.home').settingsRevisionTitleKey()).toBe('adminUi.site.seo.title');
    expect(bare('site.assets').settingsRevisionTitleKey()).toBe('adminUi.site.assets.title');
    expect(bare('site.reports').settingsRevisionTitleKey()).toBe('adminUi.reports.title');
    expect(bare('other').settingsRevisionTitleKey()).toBe('adminUi.content.revisions.title');
  });
});
