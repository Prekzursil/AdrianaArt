import { AdminComponent } from './admin.component';

/** Golden WU — blogDraftHasRestore needs key + restorable clean draft. */
describe('AdminComponent blogDraftHasRestore (golden WU)', () => {
  function bare(opts: {
    key: string | null;
    hasRestorableAutosave: boolean;
    dirty: boolean;
  }): AdminComponent {
    const cmp = Object.create(AdminComponent.prototype) as AdminComponent;
    (cmp as any).selectedBlogKey = opts.key;
    (cmp as any).blogEditLang = 'en';
    (cmp as any).ensureBlogDraft = () => ({
      hasRestorableAutosave: opts.hasRestorableAutosave,
      dirty: opts.dirty,
    });
    return cmp;
  }

  it('requires selected key, restorable autosave, and clean draft', () => {
    expect(
      bare({ key: null, hasRestorableAutosave: true, dirty: false }).blogDraftHasRestore(),
    ).toBe(false);
    expect(
      bare({ key: 'blog.a', hasRestorableAutosave: false, dirty: false }).blogDraftHasRestore(),
    ).toBe(false);
    expect(
      bare({ key: 'blog.a', hasRestorableAutosave: true, dirty: true }).blogDraftHasRestore(),
    ).toBe(false);
    expect(
      bare({ key: 'blog.a', hasRestorableAutosave: true, dirty: false }).blogDraftHasRestore(),
    ).toBe(true);
  });
});
