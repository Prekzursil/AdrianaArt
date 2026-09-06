import { AdminComponent } from './admin.component';

/** Golden WU — blogDraftHasRestore when undo stack non-empty. */
describe('AdminComponent blogDraftHasRestore (golden WU)', () => {
  function bare(len: number): AdminComponent {
    const cmp = Object.create(AdminComponent.prototype) as AdminComponent;
    (cmp as any).cmsBlogDraft = { undoStack: Array.from({ length: len }) };
    return cmp;
  }

  it('is true only when undo stack has entries', () => {
    expect(bare(0).blogDraftHasRestore()).toBe(false);
    expect(bare(2).blogDraftHasRestore()).toBe(true);
  });
});
