import { AdminComponent } from './admin.component';

/** Golden WU admin-home-draft-has-restore — homeDraftHasRestore. */
describe('AdminComponent homeDraftHasRestore (golden WU)', () => {
  it('requires restorable autosave and not dirty', () => {
    const cmp = Object.create(AdminComponent.prototype) as AdminComponent;
    (cmp as any).cmsHomeDraft = { hasRestorableAutosave: true, dirty: false };
    expect(cmp.homeDraftHasRestore()).toBe(true);
    (cmp as any).cmsHomeDraft = { hasRestorableAutosave: true, dirty: true };
    expect(cmp.homeDraftHasRestore()).toBe(false);
    (cmp as any).cmsHomeDraft = { hasRestorableAutosave: false, dirty: false };
    expect(cmp.homeDraftHasRestore()).toBe(false);
  });
});
