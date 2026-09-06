import { AdminComponent } from './admin.component';

/** Golden WU admin-page-draft-ready — page draft status getters. */
describe('AdminComponent page draft flags (golden WU)', () => {
  function createCmp(draft: {
    isReady: () => boolean;
    dirty: boolean;
    autosavePending: boolean;
  }) {
    const cmp = Object.create(AdminComponent.prototype) as AdminComponent;
    (cmp as any).ensurePageDraft = () => draft;
    return cmp;
  }

  it('proxies ready/dirty/autosaving via ensurePageDraft', () => {
    const cmp = createCmp({
      isReady: () => false,
      dirty: true,
      autosavePending: true,
    });
    expect(cmp.pageDraftReady('about' as never)).toBe(false);
    expect(cmp.pageDraftDirty('about' as never)).toBe(true);
    expect(cmp.pageDraftAutosaving('about' as never)).toBe(true);
  });
});
