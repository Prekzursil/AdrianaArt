import { AdminComponent } from './admin.component';

/** Golden WU admin-home-draft-flags — home draft status getters. */
describe('AdminComponent home draft flags (golden WU)', () => {
  function createCmp(draft: {
    isReady: () => boolean;
    dirty: boolean;
    autosavePending: boolean;
  }) {
    const cmp = Object.create(AdminComponent.prototype) as AdminComponent;
    (cmp as any).cmsHomeDraft = draft;
    return cmp;
  }

  it('proxies ready/dirty/autosaving from cmsHomeDraft', () => {
    const cmp = createCmp({
      isReady: () => true,
      dirty: true,
      autosavePending: false,
    });
    expect(cmp.homeDraftReady()).toBe(true);
    expect(cmp.homeDraftDirty()).toBe(true);
    expect(cmp.homeDraftAutosaving()).toBe(false);
  });
});
