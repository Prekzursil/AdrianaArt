import { AdminComponent } from './admin.component';

/** Golden WU admin-home-draft-restore-meta — hasRestore/restoreAt/lastAutosavedAt. */
describe('AdminComponent homeDraft restore meta (golden WU)', () => {
  it('hasRestore requires restorable autosave and not dirty', () => {
    const cmp = Object.create(AdminComponent.prototype) as AdminComponent;
    (cmp as any).cmsHomeDraft = {
      hasRestorableAutosave: true,
      dirty: false,
      restorableAutosaveAt: '2026-01-02T00:00:00Z',
      lastAutosavedAt: '2026-01-01T00:00:00Z',
    };
    expect(cmp.homeDraftHasRestore()).toBe(true);
    expect(cmp.homeDraftRestoreAt()).toBe('2026-01-02T00:00:00Z');
    expect(cmp.homeDraftLastAutosavedAt()).toBe('2026-01-01T00:00:00Z');
    (cmp as any).cmsHomeDraft.dirty = true;
    expect(cmp.homeDraftHasRestore()).toBe(false);
    (cmp as any).cmsHomeDraft.hasRestorableAutosave = false;
    (cmp as any).cmsHomeDraft.dirty = false;
    expect(cmp.homeDraftHasRestore()).toBe(false);
  });
});
