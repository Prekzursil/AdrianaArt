import { AdminThemeComponent } from './admin-theme.component';

/** Golden WU theme-discard-unsaved-changes — discardUnsavedChanges. */
describe('AdminThemeComponent discardUnsavedChanges (golden WU)', () => {
  it('restores baseline values, clears contrast/dirty, syncs preview', () => {
    const cmp = Object.create(AdminThemeComponent.prototype) as AdminThemeComponent;
    const calls: string[] = [];
    (cmp as any).baseline = { primary: '#111' };
    (cmp as any).values = { set: (v: unknown) => calls.push(`values:${JSON.stringify(v)}`) };
    (cmp as any).contrast = { set: (v: unknown) => calls.push(`contrast:${JSON.stringify(v)}`) };
    (cmp as any).dirty = { set: (v: unknown) => calls.push(`dirty:${v}`) };
    (cmp as any).syncPreview = () => calls.push('sync');
    cmp.discardUnsavedChanges();
    expect(calls).toEqual([
      'values:{"primary":"#111"}',
      'contrast:{}',
      'dirty:false',
      'sync',
    ]);
  });
});
