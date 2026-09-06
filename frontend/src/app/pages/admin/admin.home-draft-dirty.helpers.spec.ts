import { AdminComponent } from './admin.component';

/** Golden WU — homeDraftDirty mirrors cmsHomeDraft.dirty. */
describe('AdminComponent homeDraftDirty (golden WU)', () => {
  function bare(dirty: boolean): AdminComponent {
    const cmp = Object.create(AdminComponent.prototype) as AdminComponent;
    (cmp as any).cmsHomeDraft = { dirty };
    return cmp;
  }

  it('reflects draft dirty flag', () => {
    expect(bare(true).homeDraftDirty()).toBe(true);
    expect(bare(false).homeDraftDirty()).toBe(false);
  });
});
