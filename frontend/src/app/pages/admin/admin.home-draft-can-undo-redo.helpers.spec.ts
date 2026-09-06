import { AdminComponent } from './admin.component';

/** Golden WU admin-home-draft-can-undo-redo — homeDraftCanUndo/homeDraftCanRedo. */
describe('AdminComponent homeDraftCanUndo/Redo (golden WU)', () => {
  it('forwards homeBlocks into cmsHomeDraft canUndo/canRedo', () => {
    const cmp = Object.create(AdminComponent.prototype) as AdminComponent;
    const seen: any[] = [];
    (cmp as any).homeBlocks = [{ type: 'text' }];
    (cmp as any).cmsHomeDraft = {
      canUndo: (blocks: any) => {
        seen.push(['undo', blocks]);
        return true;
      },
      canRedo: (blocks: any) => {
        seen.push(['redo', blocks]);
        return false;
      },
    };
    expect(cmp.homeDraftCanUndo()).toBe(true);
    expect(cmp.homeDraftCanRedo()).toBe(false);
    expect(seen).toEqual([
      ['undo', [{ type: 'text' }]],
      ['redo', [{ type: 'text' }]],
    ]);
  });
});
