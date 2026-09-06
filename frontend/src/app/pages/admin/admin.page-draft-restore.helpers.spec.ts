import { AdminComponent } from './admin.component';

/** Golden WU admin-page-draft-restore — pageDraftHasRestore. */
describe('AdminComponent pageDraftHasRestore (golden WU)', () => {
  function createCmp(manager: { hasRestorableAutosave: boolean; dirty: boolean }) {
    const cmp = Object.create(AdminComponent.prototype) as AdminComponent;
    (cmp as any).ensurePageDraft = () => manager;
    return cmp;
  }

  it('is true only with restorable autosave and clean draft', () => {
    expect(
      createCmp({ hasRestorableAutosave: true, dirty: false }).pageDraftHasRestore('about' as never),
    ).toBe(true);
    expect(
      createCmp({ hasRestorableAutosave: true, dirty: true }).pageDraftHasRestore('about' as never),
    ).toBe(false);
    expect(
      createCmp({ hasRestorableAutosave: false, dirty: false }).pageDraftHasRestore('about' as never),
    ).toBe(false);
  });
});
