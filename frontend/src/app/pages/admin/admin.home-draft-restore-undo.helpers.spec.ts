import { AdminComponent } from './admin.component';

/** Golden WU admin-home-draft-restore-undo — restore/undo flags. */
describe('AdminComponent home draft restore/undo helpers (golden WU)', () => {
  function createCmp(draft: Record<string, unknown>, homeBlocks: unknown[] = []) {
    const cmp = Object.create(AdminComponent.prototype) as AdminComponent;
    (cmp as any).cmsHomeDraft = draft;
    (cmp as any).homeBlocks = homeBlocks;
    return cmp;
  }

  it('homeDraftHasRestore requires restorable autosave and clean draft', () => {
    expect(
      createCmp({ hasRestorableAutosave: true, dirty: false }).homeDraftHasRestore(),
    ).toBe(true);
    expect(
      createCmp({ hasRestorableAutosave: true, dirty: true }).homeDraftHasRestore(),
    ).toBe(false);
    expect(
      createCmp({ hasRestorableAutosave: false, dirty: false }).homeDraftHasRestore(),
    ).toBe(false);
  });

  it('homeDraftCanUndo / homeDraftCanRedo proxy cmsHomeDraft with homeBlocks', () => {
    const blocks = [{ id: 'b1' }];
    const draft = {
      canUndo: (b: unknown) => b === blocks,
      canRedo: (b: unknown) => b !== blocks,
      hasRestorableAutosave: false,
      dirty: false,
    };
    const cmp = createCmp(draft, blocks);
    expect(cmp.homeDraftCanUndo()).toBe(true);
    expect(cmp.homeDraftCanRedo()).toBe(false);
  });
});
