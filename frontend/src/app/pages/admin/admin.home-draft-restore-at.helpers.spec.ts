import { AdminComponent } from './admin.component';

/** Golden WU admin-home-draft-restore-at — homeDraftRestoreAt. */
describe('AdminComponent homeDraftRestoreAt (golden WU)', () => {
  it('returns cmsHomeDraft.restorableAutosaveAt', () => {
    const cmp = Object.create(AdminComponent.prototype) as AdminComponent;
    (cmp as any).cmsHomeDraft = { restorableAutosaveAt: '2026-08-01T10:00:00Z' };
    expect(cmp.homeDraftRestoreAt()).toBe('2026-08-01T10:00:00Z');
  });
});
