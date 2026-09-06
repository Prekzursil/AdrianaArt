import { AdminComponent } from './admin.component';

/** Golden WU admin-page-draft-can-undo — pageDraftCanUndo / pageDraftCanRedo. */
describe('AdminComponent pageDraftCanUndo / pageDraftCanRedo (golden WU)', () => {
  function createCmp(state: unknown, canUndo: boolean, canRedo: boolean) {
    const cmp = Object.create(AdminComponent.prototype) as AdminComponent;
    (cmp as any).currentPageDraftState = () => state;
    (cmp as any).ensurePageDraft = () => ({
      canUndo: (s: unknown) => s === state && canUndo,
      canRedo: (s: unknown) => s === state && canRedo,
    });
    return cmp;
  }

  it('proxies undo/redo through ensurePageDraft + currentPageDraftState', () => {
    const state = { blocks: [] };
    const cmp = createCmp(state, true, false);
    expect(cmp.pageDraftCanUndo('about' as never)).toBe(true);
    expect(cmp.pageDraftCanRedo('about' as never)).toBe(false);
  });
});
