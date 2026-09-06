import { AdminComponent } from './admin.component';

/** Golden WU admin-page-draft-restore-at — pageDraftRestoreAt. */
describe('AdminComponent pageDraftRestoreAt (golden WU)', () => {
  function createCmp(restorableAutosaveAt: string | null) {
    const cmp = Object.create(AdminComponent.prototype) as AdminComponent;
    (cmp as any).ensurePageDraft = () => ({ restorableAutosaveAt });
    return cmp;
  }

  it('returns restorableAutosaveAt from ensurePageDraft', () => {
    expect(createCmp(null).pageDraftRestoreAt('about' as never)).toBeNull();
    expect(createCmp('2026-01-02T03:04:05Z').pageDraftRestoreAt('about' as never)).toBe(
      '2026-01-02T03:04:05Z',
    );
  });
});
