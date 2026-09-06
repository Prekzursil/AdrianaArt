import { AdminComponent } from './admin.component';

/** Golden WU admin-home-draft-ready-dirty — homeDraftReady/homeDraftDirty. */
describe('AdminComponent home draft ready/dirty (golden WU)', () => {
  it('delegates to cmsHomeDraft', () => {
    const cmp = Object.create(AdminComponent.prototype) as AdminComponent;
    (cmp as any).cmsHomeDraft = { isReady: () => true, dirty: false };
    expect(cmp.homeDraftReady()).toBe(true);
    expect(cmp.homeDraftDirty()).toBe(false);
    (cmp as any).cmsHomeDraft = { isReady: () => false, dirty: true };
    expect(cmp.homeDraftReady()).toBe(false);
    expect(cmp.homeDraftDirty()).toBe(true);
  });
});
