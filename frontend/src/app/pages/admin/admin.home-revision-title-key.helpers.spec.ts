import { AdminComponent } from './admin.component';

/** Golden WU admin-home-revision-title-key — homeRevisionTitleKey. */
describe('AdminComponent homeRevisionTitleKey (golden WU)', () => {
  function bare(key: string): AdminComponent {
    const cmp = Object.create(AdminComponent.prototype) as AdminComponent;
    Object.assign(cmp as any, { homeRevisionKey: key });
    return cmp;
  }

  it('maps home revision keys to title i18n keys', () => {
    expect(bare('home.sections').homeRevisionTitleKey()).toBe('adminUi.home.sections.title');
    expect(bare('home.story').homeRevisionTitleKey()).toBe('adminUi.home.story.title');
    expect(bare('other').homeRevisionTitleKey()).toBe('adminUi.content.revisions.title');
  });
});
