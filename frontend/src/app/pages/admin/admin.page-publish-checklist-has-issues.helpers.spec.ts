import { AdminComponent } from './admin.component';

/** Golden WU admin-page-publish-checklist-has-issues — pagePublishChecklistHasIssues. */
describe('AdminComponent pagePublishChecklistHasIssues (golden WU)', () => {
  function bare(checklist: any): AdminComponent {
    const cmp = Object.create(AdminComponent.prototype) as AdminComponent;
    Object.assign(cmp as any, { pagePublishChecklistResult: checklist });
    return cmp;
  }

  it('is false when empty/null and true when any issue list is non-empty', () => {
    expect(bare(null).pagePublishChecklistHasIssues()).toBe(false);
    expect(
      bare({
        missingTranslations: [],
        missingAlt: [],
        emptySections: [],
        linkIssues: [],
      }).pagePublishChecklistHasIssues(),
    ).toBe(false);
    expect(
      bare({
        missingTranslations: ['ro'],
        missingAlt: [],
        emptySections: [],
        linkIssues: [],
      }).pagePublishChecklistHasIssues(),
    ).toBe(true);
    expect(
      bare({
        missingTranslations: [],
        missingAlt: [],
        emptySections: [],
        linkIssues: [{ url: '/x' }],
      }).pagePublishChecklistHasIssues(),
    ).toBe(true);
  });
});
