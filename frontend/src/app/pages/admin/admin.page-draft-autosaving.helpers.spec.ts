import { AdminComponent } from './admin.component';

/** Golden WU admin-page-draft-autosaving — pageDraftAutosaving. */
describe('AdminComponent pageDraftAutosaving (golden WU)', () => {
  it('reads autosavePending from ensurePageDraft manager', () => {
    const cmp = Object.create(AdminComponent.prototype) as AdminComponent;
    (cmp as any).ensurePageDraft = () => ({ autosavePending: true });
    expect(cmp.pageDraftAutosaving('page.about' as any)).toBe(true);
    (cmp as any).ensurePageDraft = () => ({ autosavePending: false });
    expect(cmp.pageDraftAutosaving('page.about' as any)).toBe(false);
  });
});
