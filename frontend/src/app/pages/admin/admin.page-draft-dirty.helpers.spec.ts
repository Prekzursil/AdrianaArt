import { AdminComponent } from './admin.component';

/** Golden WU — pageDraftDirty mirrors cmsPageDraft.dirty. */
describe('AdminComponent pageDraftDirty (golden WU)', () => {
  function bare(dirty: boolean): AdminComponent {
    const cmp = Object.create(AdminComponent.prototype) as AdminComponent;
    (cmp as any).cmsPageDraft = { dirty };
    return cmp;
  }

  it('reflects page draft dirty flag', () => {
    expect(bare(true).pageDraftDirty()).toBe(true);
    expect(bare(false).pageDraftDirty()).toBe(false);
  });
});
