import { AdminComponent } from './admin.component';

/** Golden WU admin-home-draft-autosaving — homeDraftAutosaving. */
describe('AdminComponent homeDraftAutosaving (golden WU)', () => {
  it('delegates to cmsHomeDraft.autosavePending', () => {
    const cmp = Object.create(AdminComponent.prototype) as AdminComponent;
    (cmp as any).cmsHomeDraft = { autosavePending: true };
    expect(cmp.homeDraftAutosaving()).toBe(true);
    (cmp as any).cmsHomeDraft = { autosavePending: false };
    expect(cmp.homeDraftAutosaving()).toBe(false);
  });
});
