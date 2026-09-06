import { AdminComponent } from './admin.component';

/** Golden WU admin-home-draft-last-autosaved-at — homeDraftLastAutosavedAt. */
describe('AdminComponent homeDraftLastAutosavedAt (golden WU)', () => {
  it('returns cmsHomeDraft.lastAutosavedAt', () => {
    const cmp = Object.create(AdminComponent.prototype) as AdminComponent;
    (cmp as any).cmsHomeDraft = { lastAutosavedAt: '2026-09-06T06:00:00Z' };
    expect(cmp.homeDraftLastAutosavedAt()).toBe('2026-09-06T06:00:00Z');
    (cmp as any).cmsHomeDraft = { lastAutosavedAt: null };
    expect(cmp.homeDraftLastAutosavedAt()).toBeNull();
  });
});
