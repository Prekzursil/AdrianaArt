import { AdminComponent } from './admin.component';

/** Golden WU admin-page-draft-last-autosaved-at — pageDraftLastAutosavedAt. */
describe('AdminComponent pageDraftLastAutosavedAt (golden WU)', () => {
  it('returns lastAutosavedAt from ensurePageDraft', () => {
    const cmp = Object.create(AdminComponent.prototype) as AdminComponent;
    (cmp as any).ensurePageDraft = () => ({ lastAutosavedAt: '2026-09-06T07:00:00Z' });
    expect(cmp.pageDraftLastAutosavedAt('page.about' as any)).toBe('2026-09-06T07:00:00Z');
    (cmp as any).ensurePageDraft = () => ({ lastAutosavedAt: null });
    expect(cmp.pageDraftLastAutosavedAt('page.about' as any)).toBeNull();
  });
});
