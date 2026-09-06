import { AdminComponent } from './admin.component';

/** Golden WU — pageDraftDirty reads ensurePageDraft(...).dirty. */
describe('AdminComponent pageDraftDirty (golden WU)', () => {
  function bare(dirty: boolean): AdminComponent {
    const cmp = Object.create(AdminComponent.prototype) as AdminComponent;
    (cmp as any).ensurePageDraft = () => ({ dirty });
    return cmp;
  }

  it('reflects ensurePageDraft dirty flag', () => {
    expect(bare(true).pageDraftDirty('home' as any)).toBe(true);
    expect(bare(false).pageDraftDirty('about' as any)).toBe(false);
  });
});
