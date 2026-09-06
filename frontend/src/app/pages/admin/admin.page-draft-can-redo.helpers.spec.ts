import { AdminComponent } from './admin.component';

/** Golden WU admin-page-draft-can-redo — pageDraftCanRedo. */
describe('AdminComponent pageDraftCanRedo (golden WU)', () => {
  it('delegates to manager.canRedo with current page draft state', () => {
    const cmp = Object.create(AdminComponent.prototype) as AdminComponent;
    const state = { blocks: [] };
    (cmp as any).currentPageDraftState = () => state;
    (cmp as any).ensurePageDraft = () => ({
      canRedo: (s: unknown) => s === state,
    });
    expect(cmp.pageDraftCanRedo('page.about' as any)).toBe(true);
    (cmp as any).ensurePageDraft = () => ({ canRedo: () => false });
    expect(cmp.pageDraftCanRedo('page.about' as any)).toBe(false);
  });
});
