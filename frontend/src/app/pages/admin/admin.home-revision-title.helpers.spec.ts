import { AdminComponent } from './admin.component';

/** Golden WU admin-home-revision-title — homeRevisionTitleKey. */
describe('AdminComponent homeRevisionTitleKey (golden WU)', () => {
  function createCmp(key: string) {
    const cmp = Object.create(AdminComponent.prototype) as AdminComponent;
    (cmp as any).homeRevisionKey = key;
    return cmp;
  }

  it('maps revision keys to title i18n keys', () => {
    expect(createCmp('home.sections').homeRevisionTitleKey()).toBe('adminUi.home.sections.title');
    expect(createCmp('home.story').homeRevisionTitleKey()).toBe('adminUi.home.story.title');
    expect(createCmp('other').homeRevisionTitleKey()).toBe('adminUi.content.revisions.title');
  });
});
