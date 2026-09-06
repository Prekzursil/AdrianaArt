import { AdminComponent } from './admin.component';

/** Golden WU admin-is-owner-helpers. */
describe('AdminComponent owner/draft helpers (golden WU)', () => {
  function bare(overrides: Record<string, unknown> = {}): AdminComponent {
    const cmp = Object.create(AdminComponent.prototype) as AdminComponent;
    Object.assign(cmp as any, {
      auth: { role: () => 'admin' },
      homeBlocks: [],
      cmsHomeDraft: {
        canUndo: jasmine.createSpy('canUndo').and.returnValue(true),
        canRedo: jasmine.createSpy('canRedo').and.returnValue(false),
      },
      ...overrides,
    });
    return cmp;
  }

  it('isOwner checks role', () => {
    expect(bare().isOwner()).toBe(false);
    expect(bare({ auth: { role: () => 'owner' } }).isOwner()).toBe(true);
  });

  it('homeDraftCanUndo/Redo delegate to cmsHomeDraft', () => {
    const cmp = bare();
    expect(cmp.homeDraftCanUndo()).toBe(true);
    expect(cmp.homeDraftCanRedo()).toBe(false);
    expect((cmp as any).cmsHomeDraft.canUndo).toHaveBeenCalledWith([]);
  });
});
